"use server";

import { decrypt } from "@/shared/lib/token";
import { getAuthToken } from "@/domains/auth";
import { patchInvitation } from "@/domains/invitation";

import {
  validateAndFlatten,
  WeddingDateInfoSchema,
  WeddingParentInfoSchema,
  WeddingPartyInfoSchema,
} from "@/shared/lib/validation";

export const patchText = async (prev: unknown, formData: FormData) => {
  const token = await getAuthToken();
  const result = await decrypt({ token, type: 'REFRESH' });
  const userId = result.payload?.userId;
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
