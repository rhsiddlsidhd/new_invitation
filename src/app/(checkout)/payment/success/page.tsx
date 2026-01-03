"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Home, FileText } from "lucide-react";
import { Btn } from "@/components/atoms/Btn/Btn";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import Spinner from "@/components/atoms/Spinner/Spinner";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // orderId가 없으면 홈으로 리다이렉트
    if (!orderId) {
      router.replace("/");
      return;
    }

    // 페이지 로딩 완료
    setLoading(false);

    // sessionStorage 확인 (이미 정리되었는지)
    const checkoutData = sessionStorage.getItem("checkoutItems");
    if (checkoutData) {
      console.warn(
        "[PaymentSuccess] sessionStorage still has checkout data, cleaning up",
      );
      sessionStorage.removeItem("checkoutItems");
    }
  }, [orderId, router]);

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Success Icon */}
        <div className="mb-8 text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
            <CheckCircle2 className="text-primary h-12 w-12" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">결제가 완료되었습니다!</h1>
          <p className="text-muted-foreground">
            주문이 정상적으로 처리되었습니다.
          </p>
        </div>

        {/* Order Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>주문 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-muted-foreground">주문번호</span>
              <span className="font-mono text-sm font-medium">{orderId}</span>
            </div>

            <div className="bg-primary/5 rounded-lg p-4">
              <div className="mb-2 flex items-start gap-2">
                <AlertCircle className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="mb-1 font-medium">주문 처리 안내</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>
                      • 결제 완료 후 영업일 기준 1-2일 이내에 처리됩니다.
                    </li>
                    <li>• 주문 내역은 마이페이지에서 확인하실 수 있습니다.</li>
                    <li>
                      • 문의사항은 고객센터로 연락 주시기 바랍니다.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Btn
            variant="outline"
            className="flex-1"
            onClick={() => router.push("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            홈으로 이동
          </Btn>
          <Btn
            className="flex-1"
            onClick={() => router.push("/my-orders")}
          >
            <FileText className="mr-2 h-4 w-4" />
            주문 내역 확인
          </Btn>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            결제 관련 문의사항이 있으시면{" "}
            <a href="/support" className="text-primary hover:underline">
              고객센터
            </a>
            로 문의해 주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
