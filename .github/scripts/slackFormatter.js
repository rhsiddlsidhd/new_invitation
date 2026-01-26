// slackFormatter.js
function formatSlackMessage(parsedData) {
  // Test Case 3: 입력 데이터가 없을 경우
  if (!parsedData) {
    return "";
  }

  // Test Case 2: isAIComment 값에 따라 아이콘 선택
  const icon = parsedData.isAIComment ? "🤖" : "🗣️";

  // Test Case 1: 템플릿 리터럴을 사용하여 메시지 조립
  const { commentAuthor, repoName, prNumber, prTitle, commentUrl } = parsedData;

  const message = `${icon} ${commentAuthor}님이 [${repoName}] PR #${prNumber} (${prTitle})에 댓글을 남겼습니다.\n👉 자세히 보기: ${commentUrl}`;

  return message;
}

module.exports = { formatSlackMessage };
