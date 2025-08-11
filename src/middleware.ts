import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 특정 도메인 접속 시 권한 체크
 * Auth && User
 */

export default async function middleware(request: NextRequest) {
  try {
    const session = request.cookies.has("session");

    if (!session) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (e) {
    console.error("Middleware error:", e);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/profile/:path*",
    "/verify/:path*",
    "/invitation/:path*",
  ],
};
