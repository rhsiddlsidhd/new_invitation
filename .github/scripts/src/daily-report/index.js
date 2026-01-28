// daily-report/index.js
const { fetchTodayActivity } = require("./githubFetcher");
const { analyzeWithGemini } = require("./geminiAnalyzer");
const { formatDailyReport } = require("./reportFormatter");
const { sendSlackMessage } = require("../shared/slackSender");

// 설정
const SLACK_CHANNEL_ID = "C0ABB2C1USH";
// const REPO_OWNER = process.env.REPO_OWNER || "rhsiddlsidhd";
const REPO_OWNER = process.env.REPO_OWNER;
// const REPO_NAME = process.env.REPO_NAME || "new_invitation";
const REPO_NAME = process.env.REPO_NAME;

async function main() {
  console.log("🚀 Starting Daily Report Generation...");

  try {
    // 1. GitHub에서 오늘의 활동 데이터 가져오기
    const activityData = await fetchTodayActivity(REPO_OWNER, REPO_NAME);

    // 2. Gemini로 분석
    console.log("🤖 Analyzing with Gemini AI...");
    const analysisResult = await analyzeWithGemini(activityData);

    // 3. 보고서 포맷팅
    const report = formatDailyReport(analysisResult, {
      owner: REPO_OWNER,
      repo: REPO_NAME,
    });

    // 4. Slack으로 전송
    console.log("📤 Sending report to Slack...");
    console.log("\n" + report + "\n");

    const success = await sendSlackMessage(SLACK_CHANNEL_ID, report);

    if (success) {
      console.log("✅ Daily report sent successfully!");
    } else {
      console.error("❌ Failed to send daily report.");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error generating daily report:", error);
    process.exit(1);
  }
}

main();
