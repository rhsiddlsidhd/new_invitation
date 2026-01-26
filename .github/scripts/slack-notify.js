// 1. 필요한 모든 모듈(부품)을 가져옵니다.
const { payloadParser } = require("./payloadParser");
const { formatSlackMessage } = require("./slackFormatter");
const { sendSlackMessage } = require("./slackSender");

// GitHub Action으로부터 전달받을 환경 변수들
const payloadString = process.env.GITHUB_PAYLOAD_JSON;
const channelID = "C0AATFXF89Y"; // 알림을 보낼 Slack 채널 ID

// 메인 워크플로우를 실행하는 비동기 함수
const main = async () => {
  console.log("Starting workflow...");

  // 2. 페이로드 데이터가 없으면 실행을 중단합니다.
  if (!payloadString) {
    console.log("No payload found. Exiting.");
    return;
  }

  let payload;
  try {
    payload = JSON.parse(payloadString);
  } catch (error) {
    console.error("Failed to parse payload JSON:", error);
    return;
  }

  // 3. '파서'를 사용하여 필요한 데이터를 추출합니다.
  const parsedData = payloadParser(payload);

  // 4. 파싱된 데이터가 유효하지 않으면(예: PR 댓글이 아니면) 실행을 중단합니다.
  if (!parsedData) {
    console.log("Parsed data is not valid for a PR comment. Exiting.");
    return;
  }

  // 5. '포맷터'를 사용하여 Slack 메시지를 생성합니다.
  const message = formatSlackMessage(parsedData);

  // 6. 생성된 메시지가 있으면 '발송기'를 사용하여 Slack으로 전송합니다.
  if (message) {
    console.log(`Sending message to channel ${channelID}:\n${message}`);
    await sendSlackMessage(channelID, message);
    console.log("Message sent successfully.");
  } else {
    console.log("Formatted message is empty. Nothing to send.");
  }

  console.log("Workflow finished.");
};

// 메인 함수 실행
main();
