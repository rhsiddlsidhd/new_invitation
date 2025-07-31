import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./app/_lib/session";

export default async function middleware(request: NextRequest) {
  try {
    const session = request.cookies.has("session");

    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();

    // const payload = await decrypt(session.value);

    // const res = NextResponse.next();
    // res.headers.set("x-user-id", payload.userId);
    // res.cookies.delete("password-verified");
    // return res;
  } catch (e) {
    console.error("Middleware error:", e);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/profile", "/verify/:path*"],
};
