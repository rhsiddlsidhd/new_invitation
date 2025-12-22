import { getCookie } from "@/lib/cookies/get";
import { decrypt, encrypt } from "@/lib/token";
import { ClientError } from "@/shared/types/error";
import { handleMethodError } from "@/shared/utils/error";
import { NextResponse } from "next/server";

export const GET = async () => {
  // 리프레쉬 토큰 유효성 검사 이후 Access token 발행
  try {
    // const token = await getAuthToken();
    const cookie = await getCookie("token");
    const refreshToken = cookie?.value;

    if (!refreshToken) {
      throw new ClientError("인증 토큰이 누락되었습니다.", 401);
    }

    const { payload } = await decrypt({ token: refreshToken, type: "REFRESH" });
    if (!payload.email) throw new ClientError("유효하지 않은 토큰입니다.", 401);
    const accessToken = await encrypt({
      email: payload.email,
      type: "ACCESS",
    });

    return NextResponse.json(
      {
        success: true,
        data: { accessToken },
      },
      { status: 200 },
    );
  } catch (e) {
    return handleMethodError(e);
  }
};
