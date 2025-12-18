"use server";
/**
 * Data - 네임 && 전화번호를 바탕으로
 * DB에서 아이디 가져오기
 */

import { getUserEmail } from "@/domains/user";
import { APIRESPONSE } from "@/shared/types/api";
import { CustomError } from "@/shared/types/error";
import { actionHttpError } from "@/shared/utils/error";
import { FindUserEmailSchema } from "@/shared/utils/validation/schema.auth";
import z from "zod";

export const findUserEmail = async (
  prev: unknown,
  formData: FormData,
): Promise<APIRESPONSE<string>> => {
  try {
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
    };
    console.log("data", data);
    const isParse = FindUserEmailSchema.safeParse(data);
    if (!isParse.success) {
      const { fieldErrors } = z.flattenError(isParse.error);
      // console.log("error", fieldErrors);
      throw new CustomError("입력 값을 확인해주세요.", 400, fieldErrors);
    }
    const { name, phone } = isParse.data;

    const email = await getUserEmail({ name, phone });

    return {
      success: true,
      data: {
        message: "유저 이메일 찾기에 성공하였습니다.",
        payload: email,
      },
    };
  } catch (e) {
    return actionHttpError(e);
  }
};
