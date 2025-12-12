import * as nodemailer from "nodemailer";
import { encrypt, generateAccessEncrypt } from "@/lib/jose";
import User from "@/models/userSchema";
import { dbConnect } from "@/utils/mongodb";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

// session 생성 && 토큰 생성 && 쿠키 저장
export async function setAuthTokenCookie(
  email: string,
  remember: boolean,
): Promise<{ token: string }> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const jwt = await encrypt({ email });
  const accessToken = await generateAccessEncrypt({ email });
  const cookieStore = await cookies();

  const baseOption: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  const options = remember ? { ...baseOption, expires: expiresAt } : baseOption;

  cookieStore.set("token", jwt, options);

  return { token: accessToken };
}

// 유저 비밀번호 조회
export const getUserPasswordById = async (
  userId: string,
): Promise<{ password: string }> => {
  await dbConnect();

  const user = await User.findOne({ userId, isDelete: false });

  if (!user) throw new Error("사용자를 찾을 수 없습니다.");

  return { password: user.password };
};

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
