import { decrypt, generateAccessEncrypt } from "@/lib/jose";
import { getAuthToken } from "@/services/auth/token";
import { CustomError } from "@/types/error";
import { handlerApiError } from "@/utils/error";

import { NextResponse } from "next/server";

export const GET = async () => {
  // 리프레쉬 토큰 유효성 검사 이후 Access token 발행
  try {
    const token = await getAuthToken();
    const payload = await decrypt(token);
    if (!payload) throw new CustomError("유효하지 않은 토큰입니다.", 401);
    const accessToken = await generateAccessEncrypt({ email: payload.email });

    return NextResponse.json(
      {
        success: true,
        message: "토큰 발행에 성공하였습니다.",
        payload: accessToken,
      },
      { status: 200 },
    );
  } catch (e) {
    return handlerApiError(e);
  }
};
