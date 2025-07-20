import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const GITHUB_USERNAME = 'HmbleCreator';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API_URL = 'https://api.github.com/graphql';

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
            isPrivate
            languages(first: 5) { nodes { name } }
          }
        }
      }
      repositories(first: 100, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
        nodes {
          id
          name
          description
          url
          homepageUrl
          isFork
          isPrivate
          languages(first: 5) { nodes { name } }
        }
      }
      contributionsCollection {
        pullRequestContributionsByRepository(maxRepositories: 30) {
          repository {
            id
            nameWithOwner
            description
            url
            isPrivate
            languages(first: 5) { nodes { name } }
          }
          contributions { totalCount }
        }
      }
    }
  }
`;

async function fetchGitHubData() {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN not set in environment');
  }
  const res = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error('Failed to fetch from GitHub');
  const { data } = await res.json();
  // Exclude forked and private repos from projects
  const pinnedRepos = data.user.pinnedItems.nodes.filter((repo: any) => !repo.isFork && !repo.isPrivate).map((repo: any) => ({
    ...repo,
    languages: repo.languages.nodes.map((l: any) => l.name),
  }));
  const allRepos = data.user.repositories.nodes.filter((repo: any) => !repo.isFork && !repo.isPrivate).map((repo: any) => ({
    ...repo,
    languages: repo.languages.nodes.map((l: any) => l.name),
  }));
  const pinnedIds = new Set(pinnedRepos.map((r: any) => r.id));
  const otherRepos = allRepos.filter((r: any) => !pinnedIds.has(r.id));
  // Only include PR contributions to other public repos (not own or private repos)
  const contributions = data.user.contributionsCollection.pullRequestContributionsByRepository
    .filter((c: any) => c.repository && !c.repository.isPrivate && c.repository.nameWithOwner.split("/")[0] !== GITHUB_USERNAME && c.contributions.totalCount > 0)
    .map((c: any) => ({
      repo: {
        ...c.repository,
        languages: c.repository.languages.nodes.map((l: any) => l.name),
      },
      count: c.contributions.totalCount,
    }));
  return { pinnedRepos, otherRepos, contributions };
}

async function main() {
  try {
    const data = await fetchGitHubData();
    const outPath = path.join(process.cwd(), 'public', 'github-data.json');
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
    console.log('GitHub data written to', outPath);
  } catch (err) {
    console.error('Error fetching GitHub data:', err);
    process.exit(1);
  }
}

main(); 