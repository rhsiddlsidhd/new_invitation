"use server";

import { encrypt, generateAccessEncrypt } from "@/shared/lib/jose";
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
