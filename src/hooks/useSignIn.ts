"use client";

import { handleClientError } from "@/api/error";
import { fetcher } from "@/api/fetcher";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSignIn = () => {
  const router = useRouter();
  const handleSignIn = async () => {
    try {
      const nextPath = "/login";

      await fetcher<{ path: string }>(
        `/api/auth/entry?next=${encodeURIComponent(nextPath)}`,
        undefined,
        {
          method: "POST",
        },
      );
      router.push(nextPath);
    } catch (e) {
      const result = handleClientError(e);
      if (result && "message" in result) {
        toast.error(result.message);
      }
    }
  };
  return { handleSignIn };
};
