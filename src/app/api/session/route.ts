import { decrypt } from "@/lib/jose";
import { getAuthToken } from "@/services/auth/token";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const token = await getAuthToken();
    const payload = await decrypt(token);
    return NextResponse.json({
      success: true,
      data: {
        code: 200,
        message: "유저 조회에 성공하였습니다.",
        payload: payload.userId,
      },
    });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "알 수 없는 에러가 발생했습니다.";
    console.error(message);
    return {
      success: false,
      error: {
        code: 500,
        message,
      },
    };
  }
};
