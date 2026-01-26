const { WebClient } = require("@slack/web-api");

const sendSlackMessage = async (channelId, message) => {
  const token = process.env.SLACK_BOT_TOKEN;

  if (!token) {
    console.error(
      "Slack Bot Token not found! Ensure SLACK_BOT_TOKEN environment variable is set.",
    );
    return false;
  }

  try {
    const slackClient = new WebClient(token);
    const result = await slackClient.chat.postMessage({
      channel: channelId,
      text: message,
    });
    return result.ok;
  } catch (error) {
    console.error("Error sending Slack message:", error.message);
    return false;
  }
};

module.exports = { sendSlackMessage };
