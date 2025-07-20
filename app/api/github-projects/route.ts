import { NextRequest, NextResponse } from "next/server";

const GITHUB_USERNAME = "HmbleCreator";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API_URL = "https://api.github.com/graphql";

const query = `
  query {
    user(login: \"${GITHUB_USERNAME}\") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            homepageUrl
            isFork
            languages(first: 5) { nodes { name } }
          }
        }
      }
      repositories(first: 30, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
        nodes {
          id
          name
          description
          url
          homepageUrl
          isFork
          languages(first: 5) { nodes { name } }
        }
      }
      contributionsCollection {
        pullRequestContributionsByRepository(maxRepositories: 20) {
          repository {
            id
            nameWithOwner
            description
            url
            languages(first: 5) { nodes { name } }
          }
          contributions { totalCount }
        }
      }
    }
  }
`;

export async function GET(req: NextRequest) {
  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: "GitHub token not set" }, { status: 500 });
  }
  const res = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) return NextResponse.json({ error: "Failed to fetch from GitHub" }, { status: 500 });
  const { data } = await res.json();
  // Exclude forked repos from projects
  const pinnedRepos = data.user.pinnedItems.nodes.filter((repo: any) => !repo.isFork).map((repo: any) => ({
    ...repo,
    languages: repo.languages.nodes.map((l: any) => l.name),
  }));
  const allRepos = data.user.repositories.nodes.filter((repo: any) => !repo.isFork).map((repo: any) => ({
    ...repo,
    languages: repo.languages.nodes.map((l: any) => l.name),
  }));
  const pinnedIds = new Set(pinnedRepos.map((r: any) => r.id));
  const otherRepos = allRepos.filter((r: any) => !pinnedIds.has(r.id));
  // Only include PR contributions to other repos (not own repos)
  const contributions = data.user.contributionsCollection.pullRequestContributionsByRepository
    .filter((c: any) => c.repository && c.repository.nameWithOwner.split("/")[0] !== GITHUB_USERNAME && c.contributions.totalCount > 0)
    .map((c: any) => ({
      repo: {
        ...c.repository,
        languages: c.repository.languages.nodes.map((l: any) => l.name),
      },
      count: c.contributions.totalCount,
    }));
  return NextResponse.json({ pinnedRepos, otherRepos, contributions });
} 