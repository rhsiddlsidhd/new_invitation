import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("middleware");
  try {
    const authorization = request.headers.get("Authorization");
    const secretKey = process.env.JWT_SECRET;
    if (!authorization || !secretKey) return;
    // const accessToken = authorization.replace("Bearer ", "");
    // const decoded = jwt.verify(accessToken, secretKey);
    // console.log("decoded:", decoded);
    return NextResponse.next();
  } catch (e) {
    console.error("Middleware error:", e);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/user/me", "/api/user/password"],
};
