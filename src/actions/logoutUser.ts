"use server";

import { deleteCookie } from "@/lib/cookies/delete";

import { success } from "@/api/response";
import { handleActionError } from "@/api/error";

export const logoutUser = async () => {
  try {
    await deleteCookie("token");
    return success(null);
  } catch (e) {
    return handleActionError(e);
  }
};
