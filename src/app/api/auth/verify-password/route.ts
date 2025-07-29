import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { verifyPassword } from "@/app/_services/userServices";

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    const formData = await request.formData();

    const password = formData.get("password") as string;
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey)
      return NextResponse.json(
        { success: false, message: "JWT Secret이 설정되지 않았습니다." },
        { status: 401 }
      );
    if (!password) {
      return NextResponse.json(
        { success: false, message: "비밀번호를 입력해주세요." },
        {
          status: 400,
        }
      );
    }
    if (!token) {
      return NextResponse.json(
        { success: false, message: "토큰이 필요합니다." },
        {
          status: 401,
        }
      );
    }

    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    const userId = decoded.userId;

    /**
     * 비밀번호 검증
     * 토큰을 전달받아 현재 로그인된 사용자의 비밀번호와 비교
     */

    const userResult = await getLoginUser(userId);
    if (!userResult.success) {
      return NextResponse.json(userResult, { status: 404 });
    }
    const { password: __password } = userResult.data;

    const isPasswordValid = await verifyPassword(password, __password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "비밀번호가 올바르지 않습니다.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("비밀번호 검증 API 오류:", e);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      {
        status: 500,
      }
    );
  }
}
