import { deleteAuthToken } from "@/services/authService/token";

export const signOut = async () => {
  await deleteAuthToken();
};
