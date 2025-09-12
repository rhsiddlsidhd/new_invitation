import { decrypt } from "@/lib/jose";
import { getAuthToken } from "@/services/auth/token";
import { getUserById } from "@/services/user";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const token = await getAuthToken();
    const payload = await decrypt(token);
    console.log("payload", payload.userId);
    if (!payload) {
      throw new Error("Invalid token");
    }
    const { userId } = await getUserById(payload.userId);

    return NextResponse.json({ success: true, data: { userId } });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : `알 수 없는 에러가 발생했습니다. ${e}`;
    console.error(message);
    return NextResponse.json({ success: false, error: { message } });
  }
};
