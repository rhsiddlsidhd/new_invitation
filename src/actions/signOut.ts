"use server";

import { deleteCookie } from "@/lib/cookies/delete";

import { success } from "@/api/response";
import { handleActionError } from "@/api/error";

export const signOut = async () => {
  try {
    await deleteCookie("token");
    return success(null);
  } catch (e) {
    return handleActionError(e);
  }
};
