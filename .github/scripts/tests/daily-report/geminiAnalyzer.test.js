// geminiAnalyzer.test.js
const { analyzeWithGemini } = require("../../src/daily-report/geminiAnalyzer");

// Mock the new @google/genai library
const mockGenerateContent = jest.fn();
jest.mock("@google/genai", () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: {
      generateContent: mockGenerateContent,
    },
  })),
}));

describe("geminiAnalyzer", () => {
  beforeEach(() => {
    // Clear mocks before each test
    mockGenerateContent.mockClear();
    process.env.GEMINI_API_KEY = "test-api-key";
  });

  afterEach(() => {
    delete process.env.GEMINI_API_KEY;
  });

  test("활동이 없을 경우 '활동 없음' 메시지를 반환해야 한다", async () => {
    const activityData = { commits: [], prs: [] };
    const result = await analyzeWithGemini(activityData);
    expect(result.summary).toBe("오늘은 GitHub 활동이 없습니다.");
    expect(mockGenerateContent).not.toHaveBeenCalled();
  });

  test("API 키가 없으면 null을 반환해야 한다", async () => {
    delete process.env.GEMINI_API_KEY;
    const activityData = {
      commits: [{ sha: "abc1234", message: "test", author: "dev" }],
      prs: [],
    };
    const result = await analyzeWithGemini(activityData);
    expect(result).toBeNull();
  });

  test("커밋과 PR 데이터가 있으면 Gemini API를 호출해야 한다", async () => {
    const mockResponse = {
      text: () => "📝 오늘의 작업 요약: 새로운 기능이 추가되었습니다.",
    };
    mockGenerateContent.mockResolvedValue(mockResponse);

    const activityData = {
      commits: [
        {
          sha: "abc1234",
          message: "feat: 새 기능 추가",
          author: "developer",
        },
      ],
      prs: [
        {
          number: 1,
          title: "새 기능 PR",
          body: "설명입니다",
          state: "open",
          merged: false,
        },
      ],
    };

    const result = await analyzeWithGemini(activityData);

    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
    expect(mockGenerateContent).toHaveBeenCalledWith({
      model: "gemini-2.5-flash",
      contents: expect.any(String),
    });
    expect(result.summary).toBe(
      "📝 오늘의 작업 요약: 새로운 기능이 추가되었습니다."
    );
  });

  test("API 호출 실패 시 에러 메시지를 반환해야 한다", async () => {
    mockGenerateContent.mockRejectedValue(new Error("API Error"));

    const activityData = {
      commits: [{ sha: "abc1234", message: "test", author: "dev" }],
      prs: [],
    };

    const result = await analyzeWithGemini(activityData);

    expect(result.summary).toBe("AI 분석 중 오류가 발생했습니다.");
    expect(result.error).toBe("API Error");
  });
});