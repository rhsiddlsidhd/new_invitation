import { deleteAuthToken } from "@/services/auth/token";

export const signOut = async () => {
  await deleteAuthToken();
};
