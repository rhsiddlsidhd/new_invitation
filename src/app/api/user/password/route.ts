import { changePassword, getUserIdbyToken } from "@/app/_services/userServices";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  //입력받은 password를 해싱하여 저장
  //   token으로 사용자 ID를 추출
  //  사용자 ID를 사용하여 findOneAndUpdate 메서드를 사용하여 비밀번호를 업데이트
  //
  // 성공적으로 업데이트되면 성공 메시지와 함께 응답
  try {
    const formData = await request.formData();
    const password = formData.get("password") as string;
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "토큰이 필요합니다." },
        { status: 401 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { success: false, message: "비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const userIdResult = await getUserIdbyToken(token);
    if (!userIdResult.success) {
      return NextResponse.json(userIdResult, { status: 401 });
    }
    const { userId } = userIdResult.data;
    const result = await changePassword(userId, password);
    console.log(result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "사용자 정보를 업데이트하는 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
