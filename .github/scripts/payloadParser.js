// payloadParser.js

// 필터링할 봇 목록
const IGNORED_BOTS = ["vercel[bot]"];

function payloadParser(payload) {
  // PR 댓글이 아니면 null을 반환합니다.
  if (!payload || !payload.issue || !payload.issue.pull_request) {
    return null;
  }

  // 필요한 데이터 추출
  const commentAuthor = payload.comment?.user?.login;

  // 무시할 봇이면 null 반환
  if (IGNORED_BOTS.includes(commentAuthor)) {
    console.log(`Filtered out: ${commentAuthor}`);
    return null;
  }
  const commentUrl = payload.comment?.html_url;
  const prNumber = payload.issue?.number;
  const prTitle = payload.issue.pull_request?.title;
  const prAuthor = payload.issue?.user?.login;
  const repoName = payload.repository?.full_name;

  // AI 댓글 여부는 나중에 더 정교하게 판단할 수 있지만, 일단은 false로 가정합니다.
  const isAIComment = payload.comment.user.type === "Bot";

  // 추출된 정보를 객체로 반환
  return {
    commentAuthor,
    commentUrl,
    prNumber,
    prTitle,
    prAuthor,
    repoName,
    isAIComment,
  };
}

module.exports = { payloadParser };
