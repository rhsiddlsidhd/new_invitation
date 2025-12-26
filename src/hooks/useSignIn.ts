"use client";

import { handleClientError } from "@/api/error";
import { fetcher } from "@/api/fetcher";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
  const router = useRouter();
  const handleSignIn = async () => {
    try {
      const nextPath = "/login";

      const data = await fetcher<{ path: string }>(
        `/api/auth/entry?next=${encodeURIComponent(nextPath)}`,
        {
          method: "POST",
        },
      );
      router.push(data.path);
    } catch (e) {
      handleClientError(e);
    }
  };
  return { handleSignIn };
};
