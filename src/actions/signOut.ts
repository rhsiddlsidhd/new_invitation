"use server";

import { deleteCookie } from "@/lib/cookies/delete";
import { handleActionError } from "@/shared/utils/error";
import { success } from "@/shared/utils/response";

export const signOut = async () => {
  try {
    await deleteCookie("token");
    return success(null);
  } catch (e) {
    return handleActionError(e);
  }
};
