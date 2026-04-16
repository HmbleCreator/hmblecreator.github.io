import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const GITHUB_USERNAME = 'HmbleCreator';

// Try to use a token from env (MY_GH_PAT or GITHUB_TOKEN)
const GITHUB_TOKEN = process.env.MY_GH_PAT || process.env.GITHUB_TOKEN;
const GITHUB_API_URL = 'https://api.github.com/graphql';

const yearsToFetch = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

const query = `
  fragment ContributionFragment on ContributionsCollection {
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

  query {
    user(login: "${GITHUB_USERNAME}") {
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
      ${yearsToFetch.map(y => `contributions_${y}: contributionsCollection(from: "${y}-01-01T00:00:00Z", to: "${y}-12-31T23:59:59Z") { ...ContributionFragment }`).join('\n      ')}
    }
  }
`;

async function fetchGitHubData() {
  if (!GITHUB_TOKEN) {
    throw new Error('❌ No GitHub token found (set MY_GH_PAT or GITHUB_TOKEN in env)');
  }

  const res = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`❌ GitHub API error ${res.status}: ${errorText}`);
  }

  const { data, errors } = await res.json();

  if (errors) {
    throw new Error(`❌ GraphQL errors: ${JSON.stringify(errors, null, 2)}`);
  }

  // Filter pinned repos
  const pinnedRepos = data.user.pinnedItems.nodes
    .filter((repo: any) => !repo.isFork && !repo.isPrivate)
    .map((repo: any) => ({
      ...repo,
      languages: repo.languages.nodes.map((l: any) => l.name),
    }));

  // Filter all public repos
  const allRepos = data.user.repositories.nodes
    .filter((repo: any) => !repo.isFork && !repo.isPrivate)
    .map((repo: any) => ({
      ...repo,
      languages: repo.languages.nodes.map((l: any) => l.name),
    }));

  // Exclude pinned repos from "other"
  const pinnedIds = new Set(pinnedRepos.map((r: any) => r.id));
  const otherRepos = allRepos.filter((r: any) => !pinnedIds.has(r.id));

  // Aggregate contributions from all fetched years
  const repoContributionsMap = new Map();

  yearsToFetch.forEach(year => {
    const coll = data.user[`contributions_${year}`];
    if (coll && coll.pullRequestContributionsByRepository) {
      coll.pullRequestContributionsByRepository.forEach((c: any) => {
        if (!c.repository || c.repository.isPrivate) return;
        if (c.repository.nameWithOwner.split("/")[0] === GITHUB_USERNAME) return;
        if (c.contributions.totalCount === 0) return;

        const repoId = c.repository.id;
        if (repoContributionsMap.has(repoId)) {
          repoContributionsMap.get(repoId).count += c.contributions.totalCount;
        } else {
          repoContributionsMap.set(repoId, {
            repo: {
              ...c.repository,
              languages: c.repository.languages.nodes.map((l: any) => l.name)
            },
            count: c.contributions.totalCount
          });
        }
      });
    }
  });

  const contributions = Array.from(repoContributionsMap.values()).sort((a: any, b: any) => b.count - a.count);

  return { pinnedRepos, otherRepos, contributions };
}

async function main() {
  try {
    const data = await fetchGitHubData();
    const outPath = path.join(process.cwd(), 'public', 'github-data.json');
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
    console.log('✅ GitHub data written to', outPath);
  } catch (err: any) {
    console.error('Error fetching GitHub data:', err.message);
    process.exit(1);
  }
}

main();
