import { encrypt } from "@/shared/lib/token";
import { ClientError } from "@/shared/types/error";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { handleMethodError } from "@/shared/utils/error";

// entry 토큰을 발행하고 지정된 경로로 302 리다이렉트
export const POST = async (req: NextRequest) => {
  try {
    const entryToken = await encrypt({ type: "ENTRY" });
    const cookieStore = await cookies();
    const path = req.nextUrl.searchParams.get("next");

    if (!path) throw new ClientError("잘못된 요청입니다.", 400);
    cookieStore.set("entry", entryToken);
    return NextResponse.json({
      success: true,
      data: { path },
    });
  } catch (e) {
    console.error("entry token issue", e);
    return handleMethodError(e);
  }
};
