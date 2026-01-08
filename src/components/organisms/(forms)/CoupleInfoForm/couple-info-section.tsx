"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";

import BankAccount from "@/components/molecules/(input-group)/BankAccount";
import LabeledInput from "@/components/molecules/(input-group)/LabeledInput";
import useFetchCoupleInfo from "@/hooks/useFetchCoupleInfo";

export function CoupleInfoSection() {
  const { data, isLoading } = useFetchCoupleInfo();

  if (isLoading) return <div>로딩중...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>신랑 & 신부 정보</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Groom Info */}
          <div className="space-y-4">
            <h3 className="text-foreground border-border border-b pb-2 text-lg font-semibold">
              신랑 정보
            </h3>

            <LabeledInput
              id="groom.name"
              name="groom_name"
              type="text"
              placeholder="신랑 이름"
              defaultValue={data?.groom?.name}
              required
            >
              이름 *
            </LabeledInput>

            <LabeledInput
              id="groom.phone"
              name="groom_phone"
              type="tel"
              placeholder="010-1234-5678"
              defaultValue={data?.groom?.phone}
              required
            >
              연락처 *
            </LabeledInput>

            <BankAccount
              id="groom"
              defaultBankName={data?.groom?.bankName}
              defaultAccountNumber={data?.groom?.accountNumber}
            />
          </div>

          {/* Bride Info */}
          <div className="space-y-4">
            <h3 className="text-foreground border-border border-b pb-2 text-lg font-semibold">
              신부 정보
            </h3>

            <LabeledInput
              id="bride.name"
              name="bride_name"
              type="text"
              placeholder="신부 이름"
              defaultValue={data?.bride?.name}
              required
            >
              이름 *
            </LabeledInput>

            <LabeledInput
              id="bride.phone"
              name="bride_phone"
              type="tel"
              placeholder="010-1234-5678"
              defaultValue={data?.bride?.phone}
              required
            >
              연락처 *
            </LabeledInput>

            <BankAccount
              id="bride"
              defaultBankName={data?.bride?.bankName}
              defaultAccountNumber={data?.bride?.accountNumber}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
