"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
import { Card } from "@/components/atoms/Card/Card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminError({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <div className="space-y-6 p-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full bg-red-100 p-4">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                관리자 페이지 오류
              </h1>
              <p className="text-muted-foreground">
                요청을 처리하는 중 문제가 발생했습니다.
              </p>
            </div>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-red-600">
                Development Error Details:
              </p>
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-xs font-mono text-red-800 break-all whitespace-pre-wrap">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="mt-2 text-xs text-red-600">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Btn onClick={reset} variant="default" size="lg">
              다시 시도
            </Btn>
            <Btn
              onClick={() => router.push("/admin")}
              variant="outline"
              size="lg"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              관리자 대시보드로
            </Btn>
          </div>
        </div>
      </Card>
    </div>
  );
}
