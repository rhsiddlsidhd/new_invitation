import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const getCookie = async (
  key: string, //token
): Promise<RequestCookie | undefined> => {
  const store = await cookies();
  return store.get(key);
};
