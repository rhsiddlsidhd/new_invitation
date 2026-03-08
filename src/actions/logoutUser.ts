"use server";

import { deleteCookie } from "@/lib/cookies/delete";
import { redirect } from "next/navigation";

export const logoutUser = async () => {
  await deleteCookie("token");

  redirect("/");
};
