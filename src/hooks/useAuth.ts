"use client";
import { useEffect, useState } from "react";
import useAuthTokenStore from "../store/authTokenStore";
import { fetcher } from "@/api/fetcher";
import { handleClientError } from "@/api/error";
import { decodeJwt } from "jose";

const useAuth = () => {
  const isAuth = useAuthTokenStore((state) => state.isAuth);
  const token = useAuthTokenStore((state) => state.token);

  const [loading, setLoading] = useState(true);

  const userId = token ? (decodeJwt(token).id as string) : null;

  useEffect(() => {
    const verify = async () => {
      // 이미 인증되어 있으면 검증 스킵

      try {
        // fetcher를 사용해서 인증 검증
        // access token이 없으면 401 발생 -> fetcher 내부에서 자동으로 refresh
        await fetcher("/api/auth/verify", { method: "POST" }, { auth: true });
      } catch (e) {
        // refresh 실패 시 (로그인 필요)
        handleClientError(e);
      } finally {
        setLoading(false);
      }
    };

    verify();
    // 마운트 시 한 번만 실행 (isAuth를 dependency에 넣으면 불필요한 재실행 발생)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isAuth, loading, userId };
};

export default useAuth;
