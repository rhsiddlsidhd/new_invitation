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
    return null;
  }
  const commentUrl = payload.comment.html_url;
  const isAIComment = payload.comment.user.type === "Bot";
  const prNumber = payload.issue.number;
  const prAuthor = payload.issue.user.login;
  const repoName = payload.repository.full_name;

  return {
    commentAuthor,
    commentUrl,
    prNumber,
    prAuthor,
    repoName,
    isAIComment,
  };
}

module.exports = { payloadParser };
