"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
import { Card } from "@/components/atoms/Card/Card";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="space-y-6 p-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full bg-red-100 p-3">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                오류가 발생했습니다
              </h1>
              <p className="text-sm text-muted-foreground">
                요청을 처리하는 중 문제가 발생했습니다.
              </p>
            </div>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-xs font-mono text-red-800 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="mt-2 text-xs text-red-600">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <Btn onClick={reset} variant="default" className="flex-1">
              다시 시도
            </Btn>
            <Btn
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="flex-1"
            >
              홈으로
            </Btn>
          </div>
        </div>
      </Card>
    </div>
  );
}
