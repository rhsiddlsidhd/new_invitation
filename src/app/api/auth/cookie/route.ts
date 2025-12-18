import { handlerApiError } from "@/shared/utils/error";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const DELETE = async (): Promise<NextResponse> => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("userEmail");
    return NextResponse.json({
      success: true,
      message: "쿠키를 성공적으로 삭제하였습니다.",
      payload: undefined,
    });
  } catch (e) {
    return handlerApiError(e);
  }
};
