"use server";

import { validateAndFlatten } from "@/lib/validation";
import { cookies } from "next/headers";
import { PWConfirmSchema } from "@/schemas/pwConfirm.schema";
import { APIResponse, success } from "@/api/response";
import { changePassword } from "@/services/user.service";
import { handleActionError } from "@/api/error";
import { HTTPError } from "@/api/type";

// 유저가 비밀번호를 기억이 나지 않을때 로그인 하지 않은 상태에서 유저의 이메일의 비밀번호를 변경하는 컨트롤러
export const updateUserPassword = async (
  prev: unknown,
  formData: FormData,
): Promise<APIResponse<{ message: string }>> => {
  try {
    const cookieStore = await cookies();

    const user = cookieStore.get("userEmail");

    if (!user) throw new HTTPError("잠시 후 다시 시도해주세요", 500);

    const data = {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const parsed = validateAndFlatten(PWConfirmSchema, data);

    if (!parsed.success) {
      throw new HTTPError("입력 값을 확인해주세요.", 400, parsed.error);
    }

    const { password } = parsed.data;

    const userFound = await changePassword(user.value, password);
    if (!userFound) throw new HTTPError("유저를 찾을 수가 없습니다.", 404);

    cookieStore.delete("userEmail");
    return success({ message: "비밀번호가 성공적으로 변경되었습니다." });
  } catch (error) {
    return handleActionError(error);
  }
};
