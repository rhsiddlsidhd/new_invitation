// _run_integration_test.js

console.log("🚀 Starting Integration Test...");

// 1. 테스트에 사용할 목(Mock) 페이로드 데이터를 가져옵니다.
const mockPayload = require("./tests/pr-comment/__mocks__/mockPayload.js");

// 2. GitHub Action이 넘겨주는 것처럼, 페이로드 객체를 JSON 문자열로 변환합니다.
const payloadString = JSON.stringify(mockPayload);

// 3. 환경 변수 'GITHUB_PAYLOAD_JSON'에 위 문자열을 설정합니다.
//    이렇게 하면 app.js가 이 데이터를 읽어서 사용할 수 있게 됩니다.
process.env.GITHUB_PAYLOAD_JSON = payloadString;

// 4. slackSender가 토큰을 찾을 수 있도록 가짜 토큰을 설정합니다.
//    (실제 메시지 전송은 slackSender.test.js에서 이미 검증했으므로, 여기서는 흐름만 봅니다.)
// process.env.SLACK_BOT_TOKEN = 'fake-token-for-integration-test';

// 5. 모든 환경 변수가 설정된 후, 메인 워크플로우인 app.js를 실행합니다.
try {
  console.log("-----------------------------------------");
  require("./src/pr-comment/index.js");
  console.log("-----------------------------------------");
  console.log("✅ Integration Test Finished Successfully.");
} catch (error) {
  console.error("❌ Integration Test Failed:", error);
}
