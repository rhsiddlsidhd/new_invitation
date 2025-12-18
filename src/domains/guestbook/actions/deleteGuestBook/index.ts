"use server";

import {
  deleteUserGuestBook,
  validateGuestBookPassword,
} from "@/domains/guestbook";

import { redirect } from "next/navigation";

export const deleteGuestBook = async (prev: unknown, formData: FormData) => {
  // _id 일치하는 GuestBook.password 와 formData에 입력된 value와 비교
  // 일치하지 않으면 error
  // 일치하면 DeleteUserGuestBook 진행

  try {
    const { id, password } = Object.fromEntries(formData) as Record<
      string,
      string
    >;

    const isVerify = await validateGuestBookPassword({
      id,
      password,
    });

    if (!isVerify) {
      return {
        success: false,
        error: "비밀번호가 일치하지 않습니다.",
      };
    }
    await deleteUserGuestBook(id);

    return {
      success: true,
      message: "방명록이 삭제되었습니다.",
    };
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "서버 에러가 발생했습니다.";
    console.error(message);
    redirect("/");
  }
};
