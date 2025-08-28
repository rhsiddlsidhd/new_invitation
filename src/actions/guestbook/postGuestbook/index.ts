"use server";

import { decrypt, getSession } from "@/lib/session";
import { createGuestBook } from "@/services/guestBookServices";
import { hashPassword } from "@/services/userServices";
import { GuestBook } from "@/types";

const isGuestbookKey = (key: string): key is keyof GuestBook => {
  return ["name", "password", "message"].includes(key);
};

export const postGuestbook = async (prev: unknown, formData: FormData) => {
  const token = await getSession();
  const { userId } = await decrypt(token);
  //방명록글의 ID 는 토큰으로 가져오면 안되고 params로 가져와야
  //특정되지 않은 유저들이 배포받은 사용자의 청첩장 방명록 글에 DATA CREATE 가능
  const saveData: GuestBook = { name: "", password: "", message: "" };

  for (const [key, value] of formData.entries()) {
    // if (typeof value === "string" && isGuestbookKey(key)) saveData[key] = value;
    if (typeof value === "string" && isGuestbookKey(key)) {
      const processedValue =
        key === "password" ? await hashPassword(value) : value;

      saveData[key] = processedValue;
    }
  }

  const res = await createGuestBook({ id: userId, data: saveData });
  console.log("res", res);
};
