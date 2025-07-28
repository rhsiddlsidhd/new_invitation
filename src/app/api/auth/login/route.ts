import { NextRequest, NextResponse } from "next/server";
import {
  checkUserIdExists,
  createTokens,
  verifyPassword,
} from "../../../_services/userServices";
import { cookies } from "next/headers";
import { createSession } from "@/app/_lib/session";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const userId = formData.get("userId") as string;
    const password = formData.get("password") as string;

    if (!userId || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "아이디와 비밀번호를 입력해주세요.",
        },
        { status: 400 }
      );
    }

    // db에 userId가 존재하는지 확인

    const userResult = await checkUserIdExists(userId);

    if (!userResult.success) {
      return NextResponse.json(userResult, { status: 404 });
    }

    const { userId: __userId, password: __password } = userResult.data;

    // 비밀번호 검증
    // 입력한 password 와 userID로 저장되어 있는 hash password 와 비교

    const isPasswordValid = await verifyPassword(password, __password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "비밀번호가 올바르지 않습니다.",
        },
        { status: 401 }
      );
    }

    // 로그인 성공
    // 토큰 = refreshToken, accessToken 두 가지 토큰 발행
    // refreshToekn은 서버 에서 관리, accessToken은 클라이언트에서 관리
    // refresh = httpOnly 쿠키로 저장
    // accessToken = 세션 스토리지에 저장
    // refresh = 7day access = 1h

    // jose 토큰
    await createSession(__userId);

    // JWT lib
    // const tokens = createTokens(__userId);

    // const cookieStore = await cookies();
    // if (tokens && tokens.refreshToken) {
    //   cookieStore.set("token", tokens.refreshToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //     maxAge: 60 * 60 * 24 * 7,
    //   });
    // }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("로그인 API 오류:", error);
    const errorMessage =
      error instanceof Error ? error.message : "서버 오류가 발생했습니다.";
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
