import { generateEntryEncrypt } from "@/lib/jose";
import { CustomError } from "@/types/error";
import { cookies } from "next/headers";

import { NextResponse, type NextRequest } from "next/server";

// entry 토큰을 발행하고 지정된 경로로 302 리다이렉트
export const POST = async (req: NextRequest) => {
  try {
    const entryToken = await generateEntryEncrypt();
    const cookieStore = await cookies();
    const path = req.nextUrl.searchParams.get("next");

    if (!path) throw new CustomError("잘못된 요청입니다.", 400);
    cookieStore.set("entry", entryToken);
    return NextResponse.json({
      success: true,
      message: "토큰 발행에 성공하였습니다",
      payload: path,
    });
  } catch (e) {
    console.error("entry token issue", e);
    return NextResponse.json(
      {
        success: false,
        message: "토큰 발행에 실패하였습니다.",
      },
      { status: 500 },
    );
  }
};
