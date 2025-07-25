import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  //로그아웃 관리
  //서버에서 관리하는 쿠키를 삭제하는 방식으로 로그아웃 처리
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("로그아웃 API 오류:", error);
    return NextResponse.json(
      {
        success: false,
        message: "서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
