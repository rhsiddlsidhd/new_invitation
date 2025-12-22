import { jwtVerify, JWTVerifyResult } from "jose";
import { DecryptProps } from "./type";
import { ENTRY_ENCODED_KEY, JWT_ENCODED_KEY } from "./config";

export async function decrypt(
  payload: DecryptProps,
): Promise<JWTVerifyResult<Omit<DecryptProps, "type">>> {
  return await jwtVerify<Omit<DecryptProps, "type">>(
    payload.token,
    payload.type !== "ENTRY" ? JWT_ENCODED_KEY : ENTRY_ENCODED_KEY,
    {
      algorithms: ["HS256"],
    },
  );
}
