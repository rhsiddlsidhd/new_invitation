"use server";

import { APIResponse, success } from "@/shared/utils/response";

import { createUser, isEmailExists } from "@/domains/user";
import { handleActionError } from "@/shared/utils/error";
import { hashPassword } from "@/shared/lib/bcrypt";
import { ClientError } from "@/shared/types/error";
import { validateAndFlatten } from "@/shared/lib/validation";
import { RegisterSchema } from "@/schemas/register.schema";

export async function signUp(
  prev: unknown,
  formData: FormData,
): Promise<APIResponse<{ message: string }>> {
  try {
    const data = {
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const parsed = validateAndFlatten(RegisterSchema, data);

    if (!parsed.success) {
      throw new ClientError("입력값을 확인해주세요", 400, parsed.error);
    }

    const { email, name, phone, password } = parsed.data;

    const isEmail = await isEmailExists(email);

    if (isEmail) throw new ClientError("이미 존재하는 이메일 입니다.", 409);

    const hashedPassword = await hashPassword(password);

    await createUser({
      password: hashedPassword,
      email,
      name,
      phone,
    });

    return success({
      message: `${data.email}님 회원가입을 축하드립니다.`,
    });
  } catch (e) {
    return handleActionError(e);
  }
}
