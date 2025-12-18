"use server";

import * as nodemailer from "nodemailer";

// 이메일 전송 서비스

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_KEY,
  },
});

export const sendEmail = async ({
  email,
  path,
}: {
  email: string;
  path: string;
}): Promise<void> => {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "[WeddingCard] 비밀번호 재설정을 하세요.",
    html: `<h2>비밀번호 재설정 안내</h2>
  <p>아래 링크를 클릭하여 비밀번호 재설정을 진행해주세요.</p>
  <p style="color: #d9534f; font-weight: bold;">
    이 링크는 보안을 위해 생성 시점부터 10분 동안만 유효합니다.
  </p>
  <a href="${path}" target="_blank" style="color: #4a90e2; font-size: 16px;">
    비밀번호 재설정하기
  </a>
  `,
  });
};
