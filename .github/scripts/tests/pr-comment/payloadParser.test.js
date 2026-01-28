// payloadParser.test.js
const mockPayload = require("./__mocks__/mockPayload.js"); // 목데이터 로드
const mockIssueCommentPayload = require("./__mocks__/mockIssueCommentPayload.js"); // 일반 이슈 목데이터 로드
const { payloadParser } = require("../../src/pr-comment/payloadParser"); // 테스트할 함수 로드 (이름 변경)

describe("payloadParser 함수", () => {
  // Test Case 1: 올바른 PR 댓글 페이로드를 파싱할 때
  test("유효한 PR 댓글 페이로드를 입력하면, 필요한 정보가 담긴 객체를 정확히 반환해야 한다", () => {
    // 우리가 mockPayload.js를 파싱했을 때 기대하는 결과 (정답지)
    const expectedOutput = {
      commentAuthor: "octocat-commenter",
      commentUrl:
        "https://github.com/octocat/Hello-World/issues/1347#issuecomment-12345",
      prNumber: 1347,
      prAuthor: "octocat-pr-author",
      repoName: "octocat/Hello-World",
      isAIComment: true,
    };

    // payloadParser 함수 (아직 구현되지 않음)를 실행
    const actualOutput = payloadParser(mockPayload);

    // 결과가 기대하는 정답과 정확히 일치하는지 검증
    expect(actualOutput).toEqual(expectedOutput);
  });

  // Test Case 2: 일반 이슈 댓글 페이로드를 파싱할 때 (PR이 아님)
  test("pull_request 필드가 없는 일반 이슈 댓글 페이로드를 입력하면 null을 반환해야 한다", () => {
    // payloadParser 함수 실행
    const actualOutput = payloadParser(mockIssueCommentPayload);

    // 결과가 null인지 검증
    expect(actualOutput).toBeNull();
  });

  // Test Case 3: 비정상적인 (malformed) 페이로드를 파싱할 때
  test("null 또는 빈 객체와 같은 비정상적인 페이로드를 입력하면 null을 반환해야 한다", () => {
    // null 페이로드 테스트
    expect(payloadParser(null)).toBeNull();

    // 빈 객체 페이로드 테스트
    expect(payloadParser({})).toBeNull();

    // issue 필드가 없는 페이로드 테스트
    expect(payloadParser({ comment: {} })).toBeNull();
  });
});
