"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Input } from "@/components/atoms/Input/Input";
import { Label } from "@/components/atoms/Label/Label";
import { Textarea } from "@/components/atoms/Textarea";
import { Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ICoupleInfo } from "@/models/coupleInfo.model";
import { format } from "date-fns";
import LabeledInput from "@/components/molecules/(input-group)/LabeledInput";

interface EditCoupleInfoFormProps {
  initialData: ICoupleInfo;
}

export function EditCoupleInfoForm({ initialData }: EditCoupleInfoFormProps) {
  const router = useRouter();

  // Format initial date for input fields
  const weddingDateTime = new Date(initialData.weddingDate);
  const defaultDate = format(weddingDateTime, "yyyy-MM-dd");
  const defaultTime = format(weddingDateTime, "HH:mm");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // TODO: Implement update action
    console.log("Update data:", Object.fromEntries(formData));
    alert("수정 기능은 아직 구현 중입니다.");
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <Btn
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          돌아가기
        </Btn>
        <h1 className="text-foreground mb-2 text-3xl font-bold">
          정보 수정하기
        </h1>
        <p className="text-muted-foreground">
          청첩장에 표시될 정보를 수정합니다.
        </p>
      </div>

      <form className="space-y-6 pb-24" onSubmit={handleSubmit}>
        {/* 기본 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <LabeledInput
                label="결혼식 날짜"
                name="wedding_date"
                type="date"
                defaultValue={defaultDate}
                required
              />
              <LabeledInput
                label="결혼식 시간"
                name="wedding_time"
                type="time"
                defaultValue={defaultTime}
                required
              />
            </div>

            <LabeledInput
              label="예식장 이름"
              name="venue"
              defaultValue={initialData.venue}
              placeholder="○○웨딩홀"
              required
            />

            <LabeledInput
              label="예식장 주소"
              name="address"
              defaultValue={initialData.address}
              placeholder="서울시 강남구..."
              required
            />

            <LabeledInput
              label="가까운 지하철역 (선택)"
              name="subway_station"
              defaultValue={initialData.subwayStation || ""}
              placeholder="강남역"
            />

            <div className="space-y-2">
              <Label htmlFor="message">초대 메시지 (선택)</Label>
              <Textarea
                id="message"
                name="message"
                defaultValue={initialData.message || ""}
                placeholder="초대 메시지를 입력하세요"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* 신랑 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>신랑 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <LabeledInput
              label="신랑 이름"
              name="groom_name"
              defaultValue={initialData.groom.name}
              required
            />
            <LabeledInput
              label="신랑 연락처"
              name="groom_phone"
              defaultValue={initialData.groom.phone}
              placeholder="010-1234-5678"
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <LabeledInput
                label="신랑 은행명 (선택)"
                name="groom_bank_name"
                defaultValue={initialData.groom.bankName || ""}
                placeholder="○○은행"
              />
              <LabeledInput
                label="신랑 계좌번호 (선택)"
                name="groom_account_number"
                defaultValue={initialData.groom.accountNumber || ""}
                placeholder="123-456-789"
              />
            </div>
          </CardContent>
        </Card>

        {/* 신부 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>신부 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <LabeledInput
              label="신부 이름"
              name="bride_name"
              defaultValue={initialData.bride.name}
              required
            />
            <LabeledInput
              label="신부 연락처"
              name="bride_phone"
              defaultValue={initialData.bride.phone}
              placeholder="010-1234-5678"
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <LabeledInput
                label="신부 은행명 (선택)"
                name="bride_bank_name"
                defaultValue={initialData.bride.bankName || ""}
                placeholder="○○은행"
              />
              <LabeledInput
                label="신부 계좌번호 (선택)"
                name="bride_account_number"
                defaultValue={initialData.bride.accountNumber || ""}
                placeholder="123-456-789"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sticky Bottom Actions */}
        <div className="bg-background/95 border-border fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="mx-auto flex max-w-5xl gap-4">
              <Btn
                type="button"
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                취소
              </Btn>
              <Btn type="submit" size="lg" className="flex-1">
                <Save className="mr-2 h-5 w-5" />
                수정하기
              </Btn>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
