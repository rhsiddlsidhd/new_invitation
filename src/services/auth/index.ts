import { encrypt } from "@/lib/jose";
import User from "@/models/userSchema";
import { dbConnect } from "@/utils/mongodb";
import { cookies } from "next/headers";

// session 생성 && 토큰 생성 && 쿠키 저장
export async function setAuthTokenCookie(
  userId: string,
): Promise<{ success: boolean }> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const jwt = await encrypt({ userId });
  const cookieStore = await cookies();

  cookieStore.set("token", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "strict",
  });

  return { success: true };
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
