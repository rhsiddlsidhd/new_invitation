import { decrypt } from "@/shared/lib/jose";
import { getAuthToken } from "@/domains/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const token = await getAuthToken();
    const payload = await decrypt(token);

    if (!payload) {
      throw new Error("Invalid token");
    }

    return NextResponse.json({
      success: true,
      data: { userId: payload.userId },
    });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : `알 수 없는 에러가 발생했습니다. ${e}`;
    console.error(message);
    return NextResponse.json({ success: false, error: { message } });
  }
};
