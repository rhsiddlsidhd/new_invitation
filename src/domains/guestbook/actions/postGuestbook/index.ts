"use server";

import { hashPassword } from "@/shared/lib/bcrypt";
import { createGuestBook } from "@/domains/guestbook";

import { GuestBook } from "@/shared/types";

const isGuestbookKey = (key: string): key is keyof GuestBook => {
  return ["name", "password", "message", "userId"].includes(key);
};

export const postGuestbook = async (prev: unknown, formData: FormData) => {
  //방명록글의 ID 는 토큰으로 가져오면 안되고 params로 가져와야
  //특정되지 않은 유저들이 배포받은 사용자의 청첩장 방명록 글에 DATA CREATE 가능
  const saveData: GuestBook = {
    userId: "",
    name: "",
    password: "",
    message: "",
  };

  try {
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string" && isGuestbookKey(key)) {
        const processedValue =
          key === "password" ? await hashPassword(value) : value.trim();

        saveData[key] = processedValue;
      }
    }

    await createGuestBook({ data: saveData });

    return {
      success: true,
      message: "방명록 작성이 완료되었습니다.",
    };
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "서버 에러가 발생했습니다.";
    console.error(message);
    return {
      success: false,
      error: message,
    };
  }
};
