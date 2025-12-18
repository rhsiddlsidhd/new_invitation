"use server";

import { decrypt } from "@/shared/lib/jose";
import { getAuthToken } from "@/domains/auth";
import { patchInvitation } from "@/domains/invitation";

import { validateAndFlatten } from "@/shared/utils/validation";
import {
  WeddingDateInfoSchema,
  WeddingParentInfoSchema,
  WeddingPartyInfoSchema,
} from "@/shared/utils/validation/schema.server";

export const patchText = async (prev: unknown, formData: FormData) => {
  const token = await getAuthToken();
  const { userId } = await decrypt(token);
  const textField: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      textField[key] = value;
    }
  }

  const keys = Object.keys(textField);

  const validation = keys.some((k) => ["groom-name"].includes(k))
    ? validateAndFlatten(WeddingPartyInfoSchema, textField)
    : keys.some((k) => ["wedding-date"].includes(k))
      ? validateAndFlatten(WeddingDateInfoSchema, textField)
      : validateAndFlatten(WeddingParentInfoSchema, textField);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error,
    };
  }

  const data = await patchInvitation({ id: userId, data: validation.data });

  return {
    success: true,
    message: "프로필 수정 완료",
    data,
  };
};
