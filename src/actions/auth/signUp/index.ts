"use server";

import z from "zod";

import { APIRESPONSE } from "@/types/api";
import { RegisterSchema } from "@/utils/validation/schema.auth";
import { createUser, isUserDuplicate } from "@/services/user";
import { actionHttpError } from "@/utils/error";
import { hashPassword } from "@/lib/bcrypt";

export async function signUp(
  prev: unknown,
  formData: FormData,
): Promise<APIRESPONSE> {
  try {
    const data = {
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const parsed = RegisterSchema.safeParse(data);
    if (!parsed.success) {
      const { fieldErrors, formErrors } = z.flattenError(parsed.error);
      return {
        success: false,
        error: {
          code: 400,
          message: formErrors?.[0] ?? "입력값을 확인해주세요.",
          fieldErrors,
        },
      };
    }

    const { email, name, phone, password } = parsed.data;

    await isUserDuplicate(email);

    const hashedPassword = await hashPassword(password);

    await createUser({
      password: hashedPassword,
      email,
      name,
      phone,
    });

    return {
      success: true,
      data: {
        code: 200,
        message: `${data.email}님 회원가입을 축하드립니다.`,
        payload: undefined,
      },
    };
  } catch (e) {
    return actionHttpError(e);
  }
}
