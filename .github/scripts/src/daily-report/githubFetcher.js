// githubFetcher.js
const { Octokit } = require("@octokit/rest");

// 지연 초기화를 위한 함수
let octokitInstance = null;
function getOctokit() {
  if (!octokitInstance) {
    octokitInstance = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  }
  return octokitInstance;
}

// 테스트용 리셋 함수
function resetOctokit() {
  octokitInstance = null;
}

/**
 * 오늘 하루의 커밋 목록을 가져옵니다.
 */
async function fetchTodayCommits(owner, repo) {
  const octokit = getOctokit();
  // 오늘 00:00:00 (KST 기준으로 계산)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const since = today.toISOString();

  try {
    const { data: commits } = await octokit.repos.listCommits({
      owner,
      repo,
      since,
      per_page: 100,
    });

    return commits.map((commit) => ({
      sha: commit.sha.substring(0, 7),
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      url: commit.html_url,
    }));
  } catch (error) {
    console.error("Error fetching commits:", error.message);
    return [];
  }
}

/**
 * 오늘 하루의 PR 목록을 가져옵니다. (생성 또는 업데이트된 PR)
 */
async function fetchTodayPRs(owner, repo) {
  const octokit = getOctokit();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const since = today.toISOString();

  try {
    const { data: prs } = await octokit.pulls.list({
      owner,
      repo,
      state: "all",
      sort: "updated",
      direction: "desc",
      per_page: 100,
    });

    // 오늘 생성되거나 업데이트된 PR만 필터링
    const todayPRs = prs.filter((pr) => {
      const updatedAt = new Date(pr.updated_at);
      const createdAt = new Date(pr.created_at);
      const todayDate = new Date(since);
      return updatedAt >= todayDate || createdAt >= todayDate;
    });

    return todayPRs.map((pr) => ({
      number: pr.number,
      title: pr.title,
      body: pr.body || "",
      author: pr.user.login,
      state: pr.state,
      createdAt: pr.created_at,
      updatedAt: pr.updated_at,
      url: pr.html_url,
      merged: pr.merged_at !== null,
    }));
  } catch (error) {
    console.error("Error fetching PRs:", error.message);
    return [];
  }
}

/**
 * 오늘의 모든 GitHub 활동을 가져옵니다.
 */
async function fetchTodayActivity(owner, repo) {
  console.log(`Fetching today's activity for ${owner}/${repo}...`);

  const [commits, prs] = await Promise.all([
    fetchTodayCommits(owner, repo),
    fetchTodayPRs(owner, repo),
  ]);

  console.log(`Found ${commits.length} commits and ${prs.length} PRs today.`);

  return { commits, prs };
}

module.exports = { fetchTodayActivity, fetchTodayCommits, fetchTodayPRs, resetOctokit };
