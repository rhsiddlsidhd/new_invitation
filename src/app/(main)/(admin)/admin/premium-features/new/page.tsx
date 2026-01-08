"use client";

import type React from "react";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PremiumFeatureRegistrationForm from "@/components/organisms/(forms)/PremiumFeatureRegistrationForm";
import { Btn } from "@/components/atoms/Btn/Btn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";

export default function NewPremiumFeaturePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/premium-features">
          <Btn variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Btn>
        </Link>
        <div>
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            프리미엄 기능 등록
          </h1>
          <p className="text-muted-foreground">
            상품에 추가할 수 있는 새로운 유료 기능을 등록합니다.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>기능 정보</CardTitle>
          <CardDescription>
            프리미엄 기능의 기본 정보를 입력해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PremiumFeatureRegistrationForm />
        </CardContent>
      </Card>
    </div>
  );
}
