"use server";

import { cookies } from "next/headers";
import { decrypt, deleteSession, getSession } from "../lib/session";
import {
  changePassword,
  deleteUser,
  updateUserEmail,
} from "../services/userServices";
import { ActionState } from "./auth";
import { redirect } from "next/navigation";

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

  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const token = await getSession();
    const payload = await decrypt(token);

    const updateResult = await updateUserEmail(payload.userId, {
      email,
      password,
    });
    console.log("updateResult", updateResult);

    if (!updateResult.success) return updateResult;

    // 성공시 비밀번호 검증 상태 초기화
    const cookieStore = await cookies();
    cookieStore.delete("password-verified");

    return updateResult;
  } catch {
    await deleteSession();
    redirect("/auth/login");
  }
};

export const updatedUserPassword = async (
  prev: ActionState,
  formData: FormData
) => {
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const token = await getSession();
  const payload = await decrypt(token);

  if (password !== passwordConfirm) {
    return {
      success: false,
      message: "비밀번호가 일치하지 않습니다.",
    };
  }

  const updatedResult = await changePassword(payload.userId, password);

  return updatedResult;
};

export const deleteUserAction = async (
  prev: ActionState,
  formData: FormData
) => {
  /**
   * 계정 삭제 로직
   * 현재 유저 ID 를 formData 로 전달
   * token으로 userID를 payload로 꺼내서
   * db findOne UserId 를 가져오고
   * formData로 전달받은 유저 ID와 비교하여 일치 하였을때
   * user 의 isDelete를 true 로 변경
   */

  const userId = formData.get("userId") as string;

  if (!userId) {
    return {
      success: false,
      message: "사용자 ID를 입력해주세요.",
    };
  }
  const token = await getSession();
  const payload = await decrypt(token);

  if (userId !== payload.userId) {
    return {
      success: false,
      message: "입력하신 사용자 ID가 현재 로그인된 계정과 일치하지 않습니다.",
    };
  }

  const deleteResult = await deleteUser(payload.userId);
  await deleteSession();

  if (!deleteResult.success) {
    return deleteResult;
  }

  // 성공시 세션 삭제 및 리다이렉트 필요할 수 있음
  return deleteResult;
};
