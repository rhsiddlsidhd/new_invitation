"use server";
import { handleActionError } from "@/api/error";
import { APIResponse, success } from "@/api/response";
import { HTTPError } from "@/api/type";
import { getCookie } from "@/lib/cookies/get";
import { decrypt } from "@/lib/token";
import React from "react";

export const updateCouleInfoAction = async (
  prev: unknown,
  formData: FormData,
): Promise<APIResponse<{ message: string; _id: string | null }>> => {
  try {
    const cookie = await getCookie("token");

    if (!cookie?.value) {
      throw new HTTPError("로그인이 필요합니다.", 401, undefined, "/");
    }

    const { payload } = await decrypt({ token: cookie.value, type: "REFRESH" });

    if (!payload.id) throw new HTTPError("유효하지 않은 토큰입니다.", 401);

    console.log("updateCouleInfoAction 발동 ");

    return success({
      message: "커플 정보가 성공적으로 업데이트 되었습니다.",
      _id: null,
    });
  } catch (error) {
    return handleActionError(error);
  }
};
