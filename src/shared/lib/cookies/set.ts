import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

interface CookieProps {
  value: string;
  remember: boolean;
}

export const setCookie = async (payload: CookieProps): Promise<void> => {
  const store = await cookies();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const baseOption: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  const options = payload.remember
    ? { ...baseOption, expires: expiresAt }
    : baseOption;

  store.set("token", payload.value, options);
};
