"use server";
import { deleteAuthToken } from "@/domains/auth";

export const signOut = async () => {
  await deleteAuthToken();
};
