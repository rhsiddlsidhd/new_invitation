"use server";

import { getUserByToken } from "../_lib/session";
import { updateUserEmail } from "../_services/userServices";
import { ActionState } from "./auth";

export const updateUserProfile = async (
  prev: ActionState,
  formData: FormData
) => {
  /**
   * 이메일과 password 를 받음
   * password 비교
   * 일치하면 이메일 업데이트
   * 성공하면 리다이렉트 profile
   * 실패하면 error 던져주기
   */

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await getUserByToken();
  // 미들웨어에서 이미 인증 검증 완료

  const updateResult = await updateUserEmail(user!.userId, { email, password });
  console.log("updateResult", updateResult);
  if (!updateResult.success) return updateResult;
  return updateResult;
};
