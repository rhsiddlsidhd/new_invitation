/**
 * Slack 멘션을 위한 GitHub ID → Slack User ID 매핑
 *
 * [방법 1] 매핑 테이블 (현재 사용 중)
 * - 장점: 간단, 추가 API 호출 없음
 * - 단점: 수동 관리 필요, 팀원 추가 시 직접 등록
 * - Slack User ID 확인: 프로필 → ⋮ → "멤버 ID 복사"
 *
 * [방법 2] Slack API 동적 조회
 * - const result = await slackClient.users.lookupByEmail({ email: "user@example.com" });
 * - const slackUserId = result.user.id;
 * - 장점: 자동화, 이메일로 조회 가능
 * - 단점: 추가 API 호출 필요, 이메일 정보 필요
 */

const userSlackIDMapping = {
  rhsiddlsidhd: "U0AAL694R7F",
};

function formatSlackMessage(parsedData) {
  // Test Case 3: 입력 데이터가 없을 경우
  if (!parsedData) {
    return "";
  }

  // Test Case 2: isAIComment 값에 따라 아이콘 선택
  const icon = parsedData.isAIComment ? "🤖" : "🗣️";

  // Test Case 1: 템플릿 리터럴을 사용하여 메시지 조립
  const { commentAuthor, repoName, prNumber, commentUrl } = parsedData;

  const slackId = userSlackIDMapping[commentAuthor];
  const mention = slackId ? `<@${slackId}>` : commentAuthor;

  const message = `${icon} ${mention}님이 [${repoName}] PR #${prNumber}에 댓글을 남겼습니다.\n👉 자세히 보기: ${commentUrl}`;

  return message;
}

module.exports = { formatSlackMessage };
