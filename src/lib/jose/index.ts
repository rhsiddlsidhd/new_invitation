import { jwtVerify, SignJWT } from "jose";

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
