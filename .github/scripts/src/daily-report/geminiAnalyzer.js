// geminiAnalyzer.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Gemini API를 사용하여 오늘의 활동을 분석합니다.
 */
async function analyzeWithGemini(activityData) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set.");
    return null;
  }

  const { commits, prs } = activityData;

  // 활동이 없으면 분석 스킵
  if (commits.length === 0 && prs.length === 0) {
    return {
      summary: "오늘은 GitHub 활동이 없습니다.",
      details: null,
    };
  }

  // Gemini에 전달할 프롬프트 구성
  const prompt = buildPrompt(commits, prs);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      summary: text,
      raw: { commits, prs },
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error.message);
    return {
      summary: "AI 분석 중 오류가 발생했습니다.",
      error: error.message,
    };
  }
}

/**
 * Gemini에 전달할 프롬프트를 구성합니다.
 */
function buildPrompt(commits, prs) {
  const commitList = commits
    .map((c) => `- [${c.sha}] ${c.message} (by ${c.author})`)
    .join("\n");

  const prList = prs
    .map(
      (pr) =>
        `- PR #${pr.number}: ${pr.title} [${pr.state}${pr.merged ? ", merged" : ""}]\n  설명: ${pr.body.substring(0, 200)}${pr.body.length > 200 ? "..." : ""}`
    )
    .join("\n");

  return `
당신은 개발팀의 일일 보고서를 작성하는 어시스턴트입니다.
아래의 GitHub 활동 데이터를 분석하여 한국어로 일일 보고서를 작성해주세요.

## 오늘의 커밋 (${commits.length}개)
${commitList || "없음"}

## 오늘의 PR (${prs.length}개)
${prList || "없음"}

## 요청사항
1. 오늘 수행된 작업을 카테고리별로 요약해주세요 (기능 추가, 버그 수정, 리팩토링 등)
2. 주요 변경사항을 간결하게 정리해주세요
3. 전체적인 진행 상황을 한 문장으로 요약해주세요

형식은 Slack 메시지에 적합하게 이모지를 활용하여 가독성 좋게 작성해주세요.
너무 길지 않게 핵심만 간결하게 작성해주세요.
`;
}

module.exports = { analyzeWithGemini };
