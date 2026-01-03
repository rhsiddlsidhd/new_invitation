import useAuthTokenStore from "@/store/authTokenStore";
import { ErrorResponse, SuccessResponse } from "./response";
import { HTTPError } from "./type";
import { UserRole } from "@/models/user.model";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (reason?: any) => void;
}> = [];
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export async function refreshAccessToken(): Promise<string> {
  try {
    const res = await fetch("/api/auth/refresh", { method: "POST" });
    if (!res.ok) {
      console.error("Refresh token failed:", res.status, res.statusText);
      throw new HTTPError("Failed to refresh token", res.status);
    }

    const { data }: SuccessResponse<{ accessToken: string; role: string }> =
      await res.json();
    const { accessToken, role } = data;

    // Zustand 스토어 업데이트
    useAuthTokenStore
      .getState()
      .setToken({ token: accessToken, role: role as UserRole });

    return accessToken;
  } catch (error) {
    // 리프레시 실패 시, 사용자를 로그아웃 처리
    console.error("Failed to refresh access token:", error);
    useAuthTokenStore.getState().clearAuth();
    throw error;
  }
}

export async function fetcher<T>(
  url: string,
  options?: RequestInit,
  config: { auth?: boolean } = { auth: false },
): Promise<T> {
  try {
    const token = useAuthTokenStore.getState().token;

    const headers = new Headers(options?.headers);
    if (config.auth && token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const finalOptions: RequestInit = {
      ...options,
      headers,
    };

    const res = await fetch(url, finalOptions);

    if (res.ok) {
      const body: SuccessResponse<T> = await res.json();
      return body.data;
    }

    // ===== 에러 응답 처리 =====
    const body: ErrorResponse = await res.json();
    const { message, code, errors, path } = body.error;

    if (res.status !== 401) {
      throw new HTTPError(message, code, errors, path);
    }

    // ===== 401 처리 (토큰 리프레시) =====
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        processQueue(null, newAccessToken);

        const retryHeaders = new Headers(headers);
        retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);

        const retryRes = await fetch(url, {
          ...finalOptions,
          headers: retryHeaders,
        });

        if (!retryRes.ok) {
          // retry 실패 시 에러 상세 정보 로깅
          console.error("Retry failed after token refresh:", {
            url,
            status: retryRes.status,
            statusText: retryRes.statusText,
          });

          // retry 실패가 401인 경우에만 인증 상태 초기화
          // (다른 에러는 API 자체의 문제일 수 있음)
          if (retryRes.status === 401) {
            useAuthTokenStore.getState().clearAuth();
          }
          throw new HTTPError("Retry failed", retryRes.status);
        }

        const retryBody: SuccessResponse<T> = await retryRes.json();
        return retryBody.data;
      } catch (error) {
        processQueue(error, null);

        // refresh 자체가 실패한 경우인지, retry가 실패한 경우인지 구분
        if (
          error instanceof HTTPError &&
          error.message === "Failed to refresh token"
        ) {
          throw new HTTPError("Session expired, please log in again.", 401);
        }

        throw error;
      } finally {
        isRefreshing = false;
      }
    }

    // ===== 이미 refresh 중이면 큐에 대기 =====
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    })
      .then((newAccessToken) => {
        const retryHeaders = new Headers(headers);
        retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);

        return fetch(url, {
          ...finalOptions,
          headers: retryHeaders,
        });
      })
      .then(async (res) => {
        if (!res.ok) {
          throw new HTTPError("Retry failed after refresh", res.status);
        }
        const body: SuccessResponse<T> = await res.json();
        return body.data;
      });
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }
    throw new Error("An unexpected error occurred.");
  }
}
