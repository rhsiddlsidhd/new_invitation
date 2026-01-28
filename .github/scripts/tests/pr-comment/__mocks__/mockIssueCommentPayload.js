// __mocks__/mockIssueCommentPayload.js
module.exports = {
  action: "created",
  issue: {
    url: "https://api.github.com/repos/octocat/Hello-World/issues/123",
    number: 123,
    user: {
      login: "octocat-issue-author",
    },
    // pull_request 필드가 없음 - 이 부분이 중요!
    title: "Bug: Fix broken link",
  },
  comment: {
    id: 67890,
    user: {
      login: "octocat-commenter",
      type: "User",
    },
    body: "This is a comment on a regular issue.",
    html_url:
      "https://github.com/octocat/Hello-World/issues/123#issuecomment-67890",
  },
  repository: {
    full_name: "octocat/Hello-World",
  },
  sender: {
    login: "octocat-sender",
  },
};
