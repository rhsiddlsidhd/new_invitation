import { cookies } from "next/headers";

export const deleteCookie = async (key: string): Promise<void> => {
  const store = await cookies();

  store.delete(key);
};
