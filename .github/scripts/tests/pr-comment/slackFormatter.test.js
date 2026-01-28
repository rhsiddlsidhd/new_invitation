// slackFormatter.test.js
const { formatSlackMessage } = require("../../src/pr-comment/slackFormatter");

describe("formatSlackMessage 함수", () => {
  // 테스트에 사용할 기본 목데이터
  const mockParsedData = {
    commentAuthor: "human-user",
    commentUrl: "https://github.com/comment/1",
    prNumber: 123,
    prAuthor: "pr-creator",
    repoName: "owner/repo",
    isAIComment: false,
  };

  // Test Case 1: 사람이 작성한 댓글일 때
  test("사람이 작성한 댓글일 경우, 올바른 형식의 메시지를 반환해야 한다", () => {
    const expectedMessage =
      "🗣️ human-user님이 pr-creator의 PR #123에 댓글을 남겼습니다.\n👉 자세히 보기: https://github.com/comment/1";

    const actualMessage = formatSlackMessage(mockParsedData);

    expect(actualMessage).toBe(expectedMessage);
  });

  // Test Case 2: AI가 작성한 댓글일 때
  test("AI가 작성한 댓글일 경우, 🤖 아이콘으로 메시지를 반환해야 한다", () => {
    // AI 댓글 상황을 위해 isAIComment만 true로 변경
    const aiCommentData = {
      ...mockParsedData,
      isAIComment: true,
      commentAuthor: "ai-bot",
    };

    const expectedMessage =
      "🤖 ai-bot님이 pr-creator의 PR #123에 댓글을 남겼습니다.\n👉 자세히 보기: https://github.com/comment/1";

    const actualMessage = formatSlackMessage(aiCommentData);

    expect(actualMessage).toBe(expectedMessage);
  });

  // Test Case 3: 입력 데이터가 없을 때
  test("입력 데이터가 null이거나 없을 경우, 빈 문자열을 반환해야 한다", () => {
    expect(formatSlackMessage(null)).toBe("");
    expect(formatSlackMessage(undefined)).toBe("");
  });
});
