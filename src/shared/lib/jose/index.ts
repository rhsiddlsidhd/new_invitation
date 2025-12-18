import { jwtVerify, SignJWT } from "jose";

interface SessionPayload {
  email: string;
}

const secretKey = process.env.JWT_SECRET;
const entrySecretKey = process.env.ENTRY_JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const entryEncodeKey = new TextEncoder().encode(entrySecretKey);

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

export async function generateEntryEncrypt() {
  return await new SignJWT({ entry: "entryToken" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`10m`)
    .sign(entryEncodeKey);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch {
    return false;
  }
}

export async function entryDecrypt(session: string): Promise<boolean> {
  try {
    await jwtVerify<SessionPayload>(session, entryEncodeKey, {
      algorithms: ["HS256"],
    });
    return true;
  } catch {
    return false;
  }
}
