import { deleteSession } from "@/lib/session";

export const signOut = async () => {
  await deleteSession();
};
