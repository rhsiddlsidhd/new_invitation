"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";

import BankAccount from "@/components/molecules/(input-group)/BankAccount";
import LabeledInput from "@/components/molecules/(input-group)/LabeledInput";

export function CoupleInfoSection() {
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

            {/* <Label htmlFor="groom.name">이름 *</Label>
              <Input
                id="groom.name"
                placeholder="신랑 이름"
                onChange={(e) =>
                  setCoupleInfo((prev) => ({
                    ...prev,
                    groom: { ...prev.groom, name: e.target.value },
                  }))
                }
                value={coupleInfo.groom.name}

                {...register("groom.name")}
                className={errors.groom?.name ? "border-destructive" : ""}
              />
              {errors.groom?.name && <p className="text-sm text-destructive">{errors.groom.name.message}</p>} */}

            <LabeledInput
              id="groom.name"
              name="groom.name"
              type="text"
              placeholder="신랑 이름"
            >
              이름 *
            </LabeledInput>

            <LabeledInput
              id="groom.phone"
              name="groom.phone"
              type="tel"
              placeholder="010-1234-5678"
            >
              연락처 *
            </LabeledInput>

            <BankAccount id="groom" />
          </div>

          {/* Bride Info */}
          <div className="space-y-4">
            <h3 className="text-foreground border-border border-b pb-2 text-lg font-semibold">
              신부 정보
            </h3>

            <LabeledInput
              id="bride.name"
              name="bride.name"
              type="text"
              placeholder="신부 이름"
            >
              이름 *
            </LabeledInput>

            <LabeledInput
              id="bride.phone"
              name="bride.phone"
              type="tel"
              placeholder="010-1234-5678"
            >
              연락처 *
            </LabeledInput>

            <BankAccount id="bride" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
