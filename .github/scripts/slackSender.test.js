// slackSender.test.js
const { WebClient } = require("@slack/web-api");
const { sendSlackMessage } = require("./slackSender");

// 1. '@slack/web-api' 모듈 전체를 Jest의 Mocking 기능으로 대체합니다.
jest.mock("@slack/web-api", () => ({
  // WebClient 생성자를 Mocked Class로 만듭니다.
  WebClient: jest.fn().mockImplementation(() => ({
    // Mock된 WebClient 인스턴스의 chat.postMessage 메서드를 Mocking합니다.
    chat: {
      postMessage: jest.fn(),
    },
  })),
}));

// Mock된 WebClient (JavaScript에서는 타입 캐스팅 없이 바로 사용)
const MockedWebClient = WebClient;

describe("sendSlackMessage 함수", () => {
  // Mock된 postMessage 함수를 각 테스트에서 쉽게 접근하고 제어하기 위한 변수
  let mockPostMessage;

  beforeEach(() => {
    // 각 테스트가 실행되기 전에 모든 Mock들을 초기화합니다.
    // 이를 통해 테스트 케이스 간의 의존성을 제거하고 독립성을 보장합니다.
    MockedWebClient.mockClear();

    // 새로운 Mock WebClient 인스턴스를 만들고, 그 안의 postMessage 함수를 가져옵니다.
    const mockChatInstance = {
      postMessage: jest.fn(),
    };
    MockedWebClient.mockImplementation(() => ({
      chat: mockChatInstance,
    }));
    mockPostMessage = mockChatInstance.postMessage; // 특정 Mock 함수 할당

    // 테스트를 위한 가짜 Slack Bot 토큰 환경 변수를 설정합니다.
    process.env.SLACK_BOT_TOKEN = "fake-secret-token";
  });

  test("메시지 전송 성공 시 true를 반환해야 합니다.", async () => {
    // Arrange (준비): Mock된 postMessage가 성공적인 응답을 반환하도록 설정
    mockPostMessage.mockResolvedValue({ ok: true });

    // Act (실행): sendSlackMessage 함수 호출
    const channelId = "C12345";
    const message = "Test success message";
    const result = await sendSlackMessage(channelId, message);

    // Assert (단언): 결과 및 Mock 호출 여부 검증
    expect(result).toBe(true);
    expect(MockedWebClient).toHaveBeenCalledWith("fake-secret-token"); // WebClient가 올바른 토큰으로 생성되었는지 확인
    expect(mockPostMessage).toHaveBeenCalledTimes(1); // postMessage가 한 번 호출되었는지 확인
    expect(mockPostMessage).toHaveBeenCalledWith({
      channel: channelId,
      text: message,
    }); // 올바른 인자로 호출되었는지 확인
  });

  test("API 호출 실패 시 false를 반환해야 합니다.", async () => {
    // Arrange: Mock된 postMessage가 에러를 발생시키도록 설정
    const apiError = new Error("Invalid auth");
    mockPostMessage.mockRejectedValue(apiError);

    // Act
    const channelId = "C12345";
    const message = "Test failure message";
    const result = await sendSlackMessage(channelId, message);

    // Assert
    expect(result).toBe(false);
    expect(mockPostMessage).toHaveBeenCalledTimes(1); // 실패했더라도 호출은 되었어야 함
  });

  test("Slack 토큰이 제공되지 않으면 false를 반환하고 API를 호출하지 않아야 합니다.", async () => {
    // Arrange: SLACK_BOT_TOKEN 환경 변수를 제거하여 토큰이 없는 상황을 만듭니다.
    delete process.env.SLACK_BOT_TOKEN;

    // Act
    const channelId = "C12345";
    const message = "This should not be sent";
    const result = await sendSlackMessage(channelId, message);

    // Assert
    expect(result).toBe(false);
    expect(mockPostMessage).not.toHaveBeenCalled(); // 토큰이 없으므로 API 호출이 발생하지 않아야 함
    expect(MockedWebClient).not.toHaveBeenCalled(); // WebClient 생성자도 호출되지 않아야 함
  });
});
