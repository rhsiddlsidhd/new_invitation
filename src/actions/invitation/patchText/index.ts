"use server";

import { decrypt, getSession } from "@/lib/session";
import { patchInvitation } from "@/services/invitationServices";
import { validateAndFlatten } from "@/utils/validation";
import {
  WeddingDateInfoSchema,
  WeddingParentInfoSchema,
  WeddingPartyInfoSchema,
} from "@/utils/validation/schema.server";

export const patchText = async (prev: unknown, formData: FormData) => {
  const token = await getSession();
  const { userId } = await decrypt(token);
  const textField: Map<string, string> = new Map();

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      textField.set(key, value);
    }
  }

  console.log("textField", textField);

  const keys = Object.keys(textField);
  console.log('keys',keys)
  // const inputValidation = keys.some((k) => ["groom-name"].includes(k))
  //   ? validateAndFlatten(WeddingPartyInfoSchema, textField)
  //   : keys.some((k) => ["wedding-date"].includes(k))
  //     ? validateAndFlatten(WeddingDateInfoSchema, textField)
  //     : validateAndFlatten(WeddingParentInfoSchema, textField);

  // if (!inputValidation.success) {
  //   return {
  //     success: false,
  //     error: inputValidation.error,
  //   };
  // }

  // console.log("inputValidation", inputValidation);

  // const data = await patchInvitation({id:userId,data:{}})
};
