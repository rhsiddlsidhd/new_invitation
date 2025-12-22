import { handleMethodError } from "@/api/error";
import { HTTPError } from "@/api/type";
import { getCookie } from "@/lib/cookies/get";
import { decrypt, encrypt } from "@/lib/token";
import { getUser } from "@/services/auth.service";

import { NextResponse } from "next/server";

export const GET = async () => {
  // 리프레쉬 토큰 유효성 검사 이후 Access token 발행
  try {
    const cookie = await getCookie("token");
    const refreshToken = cookie?.value;

    if (!refreshToken) {
      throw new HTTPError("인증 토큰이 누락되었습니다.", 401);
    }

    const { payload } = await decrypt({ token: refreshToken, type: "REFRESH" });

    if (!payload.id) throw new HTTPError("유효하지 않은 토큰입니다.", 401);

    const user = await getUser({ id: payload.id });

    if (!user) throw new HTTPError("사용자를 찾을 수가 없습니다.", 400);

    const accessToken = await encrypt({
      id: user._id,
      type: "ACCESS",
    });

    return NextResponse.json(
      {
        accessToken,
        role: user.role,
      },
      { status: 200 },
    );
  } catch (e) {
    return handleMethodError(e);
  }
};
