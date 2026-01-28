// __mocks__/mockPayload.js
module.exports = {
  action: "created", // 이벤트 유형 (댓글 생성)
  issue: {
    // 이슈 (PR) 정보
    url: "https://api.github.com/repos/octocat/Hello-World/issues/1347", // 이슈(PR)의 API URL
    number: 1347, // PR 또는 이슈 번호
    user: {
      // PR/이슈 작성자 정보
      login: "octocat-pr-author", // PR/이슈 작성자의 GitHub 로그인 ID
    },
    pull_request: {
      // PR 상세 정보 (이 필드가 있어야 PR에 대한 댓글임)
      url: "https://api.github.com/repos/octocat/Hello-World/pulls/1347", // PR의 API URL
      html_url: "https://github.com/octocat/Hello-World/pull/1347", // PR의 웹 URL (브라우저에서 열 수 있는 주소)
    },
  },
  comment: {
    // 댓글 정보
    id: 12345, // 댓글 ID
    user: {
      // 댓글 작성자 정보
      login: "octocat-commenter", // 댓글 작성자의 GitHub 로그인 ID
      type: "Bot",
    },
    body: "This is a test comment.", // 댓글 내용 (Markdown 형식)
    html_url:
      "https://github.com/octocat/Hello-World/issues/1347#issuecomment-12345", // 댓글의 웹 URL
  },
  repository: {
    // 저장소 정보
    full_name: "octocat/Hello-World", // 저장소 전체 이름 (예: 'owner/repo')
  },
  sender: {
    // 이벤트를 발생시킨 사용자 정보
    login: "octocat-sender", // 이벤트 발생시킨 사용자의 GitHub 로그인 ID
  },
};
