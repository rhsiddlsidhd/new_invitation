import { handleMethodError } from "@/api/error";
import { deleteCookie } from "@/lib/cookies/delete";

import { NextResponse } from "next/server";

export const DELETE = async (): Promise<NextResponse> => {
  try {
    await deleteCookie("userEmail");
    return NextResponse.json({
      success: true,
      data: { message: "쿠키를 성공적으로 삭제하였습니다." },
    });
  } catch (e) {
    return handleMethodError(e);
  }
};
