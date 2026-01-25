import { IncomingWebhook } from '@slack/webhook';
import { readFileSync, existsSync } from 'fs';

interface ReviewResult {
  summary: string;
  category: 'excellent' | 'good' | 'needs-attention' | 'critical';
  highlights: string[];
  suggestions: string[];
  score: number;
  files_changed: string[];
}

async function main() {
  // 환경 변수 검증
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('❌ SLACK_WEBHOOK_URL is not set');
    process.exit(1);
  }

  // review-result.json 파일 읽기
  const reviewFilePath = 'review-result.json';
  if (!existsSync(reviewFilePath)) {
    console.error('❌ review-result.json not found');
    process.exit(1);
  }

  const review: ReviewResult = JSON.parse(
    readFileSync(reviewFilePath, 'utf-8')
  );

  // 커밋 정보
  const sha = process.env.GITHUB_SHA || '';
  const shortSha = sha.substring(0, 7);
  const actor = process.env.GITHUB_ACTOR || 'unknown';
  const repository = process.env.GITHUB_REPOSITORY || '';
  const commitMessage = process.env.COMMIT_MESSAGE || '';
  const branch = (process.env.GITHUB_REF || '').replace('refs/heads/', '');
  const commitUrl = `https://github.com/${repository}/commit/${sha}`;

  // 카테고리별 이모지 및 색상
  const categoryConfig = {
    excellent: { emoji: ':star2:', color: '#36a64f', label: '훌륭함' },
    good: { emoji: ':white_check_mark:', color: '#2eb886', label: '양호' },
    'needs-attention': { emoji: ':warning:', color: '#daa038', label: '검토 필요' },
    critical: { emoji: ':rotating_light:', color: '#d00000', label: '긴급' },
  };

  const config = categoryConfig[review.category];

  // Slack 메시지 구성
  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `${config.emoji} Commit Review: ${config.label}`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: [
          `*커밋:* <${commitUrl}|\`${shortSha}\`> by @${actor}`,
          `*브랜치:* \`${branch}\``,
          `*메시지:* ${commitMessage.split('\n')[0]}`,
        ].join('\n'),
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*📝 요약*\n${review.summary}`,
      },
    },
  ];

  // 잘한 점
  if (review.highlights.length > 0) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*👍 잘한 점*\n${review.highlights.map(h => `• ${h}`).join('\n')}`,
      },
    });
  }

  // 개선 제안
  if (review.suggestions.length > 0) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*💡 개선 제안*\n${review.suggestions.map(s => `• ${s}`).join('\n')}`,
      },
    });
  }

  // 변경 파일 목록
  if (review.files_changed.length > 0) {
    blocks.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `📁 변경 파일: ${review.files_changed.join(', ')}`,
        },
      ],
    });
  }

  // 품질 점수
  blocks.push(
    {
      type: 'divider',
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `📊 품질 점수: *${review.score}/10*`,
        },
      ],
    }
  );

  // Slack 전송
  const webhook = new IncomingWebhook(webhookUrl);

  try {
    await webhook.send({
      text: `Commit Review: ${shortSha} by ${actor} - ${config.label}`,
      blocks,
    });
    console.log('✅ Slack 메시지 전송 완료');
  } catch (error) {
    console.error('❌ Slack 전송 실패:', error);
    process.exit(1);
  }
}

main();
