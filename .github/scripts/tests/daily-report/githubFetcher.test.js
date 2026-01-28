// githubFetcher.test.js

// Octokit 모킹 - 반드시 require 전에 설정
const mockListCommits = jest.fn();
const mockListPulls = jest.fn();

jest.mock("@octokit/rest", () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    repos: {
      listCommits: mockListCommits,
    },
    pulls: {
      list: mockListPulls,
    },
  })),
}));

const {
  fetchTodayActivity,
  fetchTodayCommits,
  fetchTodayPRs,
  resetOctokit,
} = require("../../src/daily-report/githubFetcher");

describe("githubFetcher", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetOctokit(); // 각 테스트 전에 octokit 인스턴스 리셋
  });

  describe("fetchTodayCommits", () => {
    test("커밋 목록을 올바른 형식으로 반환해야 한다", async () => {
      const mockCommits = [
        {
          sha: "abc1234567890",
          commit: {
            message: "feat: 새로운 기능 추가",
            author: { name: "developer", date: "2024-01-28T10:00:00Z" },
          },
          html_url: "https://github.com/owner/repo/commit/abc1234",
        },
      ];

      mockListCommits.mockResolvedValue({ data: mockCommits });

      const result = await fetchTodayCommits("owner", "repo");

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        sha: "abc1234",
        message: "feat: 새로운 기능 추가",
        author: "developer",
        date: "2024-01-28T10:00:00Z",
        url: "https://github.com/owner/repo/commit/abc1234",
      });
    });

    test("API 오류 시 빈 배열을 반환해야 한다", async () => {
      mockListCommits.mockRejectedValue(new Error("API Error"));

      const result = await fetchTodayCommits("owner", "repo");

      expect(result).toEqual([]);
    });
  });

  describe("fetchTodayPRs", () => {
    test("PR 목록을 올바른 형식으로 반환해야 한다", async () => {
      const today = new Date();
      const mockPRs = [
        {
          number: 42,
          title: "feat: 새 기능 PR",
          body: "이 PR은 새로운 기능을 추가합니다.",
          user: { login: "developer" },
          state: "open",
          created_at: today.toISOString(),
          updated_at: today.toISOString(),
          html_url: "https://github.com/owner/repo/pull/42",
          merged_at: null,
        },
      ];

      mockListPulls.mockResolvedValue({ data: mockPRs });

      const result = await fetchTodayPRs("owner", "repo");

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        number: 42,
        title: "feat: 새 기능 PR",
        author: "developer",
        state: "open",
        merged: false,
      });
    });

    test("API 오류 시 빈 배열을 반환해야 한다", async () => {
      mockListPulls.mockRejectedValue(new Error("API Error"));

      const result = await fetchTodayPRs("owner", "repo");

      expect(result).toEqual([]);
    });
  });

  describe("fetchTodayActivity", () => {
    test("commits와 prs를 함께 반환해야 한다", async () => {
      mockListCommits.mockResolvedValue({ data: [] });
      mockListPulls.mockResolvedValue({ data: [] });

      const result = await fetchTodayActivity("owner", "repo");

      expect(result).toHaveProperty("commits");
      expect(result).toHaveProperty("prs");
      expect(result.commits).toEqual([]);
      expect(result.prs).toEqual([]);
    });
  });
});
