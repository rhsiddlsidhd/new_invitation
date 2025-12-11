import { jwtVerify, SignJWT } from "jose";

interface SessionPayload {
  email: string;
}
const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { email: string }) {
  return await new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`7d`)
    .sign(encodedKey);
}

export async function generateAccessEncrypt(payload: { email: string }) {
  return await new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`10m`)
    .sign(encodedKey);
}

export async function decrypt(session: string) {
  const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
    algorithms: ["HS256"],
  });
  return payload;
}
