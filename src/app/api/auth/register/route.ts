import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../../../_services/userServices";

// 회원가입 API
// POST /api/auth/register

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // 필수 필드 검증

    const userId = formData.get("userId") as string;
    const password = formData.get("password") as string;

    if (!userId || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "모든 필드를 입력해주세요.",
        },
        { status: 400 }
      );
    }

    // 비밀번호 길이 검증
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "비밀번호는 최소 6자 이상이어야 합니다.",
        },
        { status: 400 }
      );
    }

    const result = await createUser({ formData });

    if (!result.success) {
      return NextResponse.json(result, { status: 409 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("회원가입 API 오류:", error);
    return NextResponse.json(
      {
        success: false,
        message: "서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
