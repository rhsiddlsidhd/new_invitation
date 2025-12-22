import { encrypt } from "@/lib/token";
import { NextResponse, type NextRequest } from "next/server";
import { setCookie } from "@/lib/cookies/set";
import { HTTPError } from "@/api/type";
import { handleMethodError } from "@/api/error";

// entry 토큰을 발행하고 지정된 경로로 401 리다이렉트
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const path = req.nextUrl.searchParams.get("next");
    if (!path) throw new HTTPError("잘못된 요청입니다.", 401, undefined, "/");

    const entryToken = await encrypt({ type: "ENTRY" });
    await setCookie({ name: "entry", value: entryToken, maxAge: 600 });

    return NextResponse.json({
      path,
    });
  } catch (e) {
    console.error("entry token issue", e);
    return handleMethodError(e);
  }
};
