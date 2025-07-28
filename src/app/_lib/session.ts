import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Home from "./../page";

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { userId: string }) {
  return await new SignJWT({ userId: payload.userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`7d`)
    .sign(encodedKey);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

// session 생성 && 토큰 생성 && 쿠키 저장
export async function createSession(userId: string) {
  try {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const jwt = await encrypt({ userId });
    const cookieStore = await cookies();

    cookieStore.set("session", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: "strict",
    });
  } catch (error) {
    console.error("session creation error:", error);
    throw new Error("세션 생성에 실패했습니다.");
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getUserByToken() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) {
    return null;
  }
  const payload = await decrypt(session.value);
  console.log(payload);

  if (!payload) return null;
  return payload;
}
