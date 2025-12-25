"use client";

import { handleClientError } from "@/api/error";
import { fetcher } from "@/api/fetcher";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
  const router = useRouter();
  const handleSignIn = async () => {
    try {
      const path = "/login";

      const data = await fetcher<{ path: string }>(
        `/api/auth/entry?next=${encodeURIComponent(path)}`,
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
