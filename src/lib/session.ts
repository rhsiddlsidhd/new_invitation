import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { userId: string }) {
  return await new SignJWT({ userId: payload.userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`7d`)
    .sign(encodedKey);
}

interface SessionPayload {
  userId: string;
}

export async function decrypt(session: string) {
  const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
    algorithms: ["HS256"],
  });
  return payload;
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

    return { success: true };
  } catch (error) {
    console.error("세션 생성 오류:", error);
    throw new Error(
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getUserByToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token)
    throw new Error("세션이 존재하지 않습니다. 다시 로그인 해주세요.");

  const payload = await decrypt(token);

  if (!payload)
    throw new Error(
      "세션이 만료되었거나 유효하지 않습니다. 다시 로그인 해주세요."
    );
  return payload;
}

// export async function getUserOrRedirect() {
//   const cookieStore = await cookies();
//   try {
//     const token = cookieStore.get("session")?.value;

//     if (!token) {
//       throw new Error("세션이 존재하지 않습니다. 다시 로그인해주세요.");
//     }
//     const payload = await decrypt(token);
//     const result = await getUserById(payload.userId);

//     return result;
//   } catch (error) {
//     const message =
//       error instanceof Error
//         ? error.message
//         : "알 수 없는 오류가 발생했습니다.";
//     console.error(message);
//     redirect("/auth/login");
//   }
// }
