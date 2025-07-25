import { NextRequest, NextResponse } from "next/server";
import {
  getUserById,
  authenticateWithToken,
  getUserIdbyToken,
  updateUser,
  deleteUser,
} from "../../../_services/userServices";
import { ApiResponse, UserData } from "@/app/_types";

// 현재 로그인한 사용자 정보 조회
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "토큰이 필요합니다.",
        },
        { status: 401 }
      );
    }

    const authResult = await authenticateWithToken(token);

    if (!authResult.success) {
      return NextResponse.json<ApiResponse>(authResult, { status: 401 });
    }

    const userId = authResult.decoded && authResult.decoded.userId;

    if (!userId) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "토큰에서 사용자 ID를 찾을 수 없습니다.",
        },
        { status: 400 }
      );
    }

    const result = await getUserById(userId);

    if (!result.success) {
      return NextResponse.json<ApiResponse>(result, { status: 404 });
    }

    const data: UserData =
      result.data && authResult.newAccessToken
        ? { ...result.data, newAccessToken: authResult.newAccessToken }
        : { ...result.data };

    const responseData: ApiResponse<UserData> = {
      success: true,
      data,
    };

    return NextResponse.json<ApiResponse<UserData>>(responseData, {
      status: 200,
    });
  } catch (error) {
    console.error("사용자 조회 API 오류:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "토큰이 필요합니다." },
        { status: 401 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "이메일과 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    //토큰을 가지고 User ID를 가져와야함

    const userIdResult = await getUserIdbyToken(token);
    if (!userIdResult.success) {
      return NextResponse.json(userIdResult, { status: 401 });
    }

    const { userId } = userIdResult.data;

    const updateResult = await updateUser(userId, { email, password });

    if (!updateResult.success) {
      return NextResponse.json(updateResult, { status: 401 });
    }

    return NextResponse.json(updateResult, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "토큰이 필요합니다." },
        { status: 401 }
      );
    }

    const userIdResult = await getUserIdbyToken(token);
    if (!userIdResult.success) {
      return NextResponse.json(userIdResult, { status: 401 });
    }

    const { userId } = userIdResult.data;

    // 사용자 삭제 로직
    const deleteResult = await deleteUser(userId);

    if (!deleteResult.success) {
      return NextResponse.json(deleteResult, { status: 404 });
    }

    return NextResponse.json(deleteResult, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
