"use client";
import { Btn } from "@/components/atoms/Btn/Btn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Input } from "@/components/atoms/Input/Input";
import { Label } from "@/components/atoms/Label/Label";
import LabeledInput from "@/components/molecules/(input-group)/LabeledInput";
import clsx from "clsx";
import { Save } from "lucide-react";
import React, { useState } from "react";

const BasicInfoForm = ({
  email,
  name,
  phone,
}: {
  email: string;
  name: string;
  phone: string;
}) => {
  const [basicInfoToggle, setBasicInfoToggle] = useState<boolean>(false);
  return (
    <form className="space-y-6">
      {/* 기본 정보 섹션 */}
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div>
            <CardTitle>기본 정보</CardTitle>
            <CardDescription>
              이메일, 이름, 전화번호를 관리합니다
            </CardDescription>
          </div>

          <div className="flex justify-end gap-2">
            <Btn
              type="submit"
              className={clsx(
                `${basicInfoToggle ? "cursor-pointer opacity-100" : "pointer-events-none opacity-0"}`,
              )}
            >
              <Save className="mr-2 h-4 w-4" />
              저장하기
            </Btn>

            <Btn
              type="button"
              variant="outline"
              onClick={() => setBasicInfoToggle(!basicInfoToggle)}
            >
              {basicInfoToggle ? "닫기" : "변경하기"}
            </Btn>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              readOnly
              className="bg-muted"
            />

            <p className="text-muted-foreground text-xs">
              이메일은 변경할 수 없습니다
            </p>
          </div>

          {basicInfoToggle ? (
            <LabeledInput id="name" name="name" type="text" defaultValue={name}>
              이름
            </LabeledInput>
          ) : (
            <div>
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                name="name"
                value={name}
                type="text"
                readOnly
                className="bg-muted"
              />
            </div>
          )}

          {basicInfoToggle ? (
            <LabeledInput
              id="phone"
              name="phone"
              type="text"
              defaultValue={phone}
            >
              전화번호
            </LabeledInput>
          ) : (
            <div>
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                readOnly
                className="bg-muted"
              />
            </div>
          )}

          {basicInfoToggle && (
            <LabeledInput id="password" name="password" type="password">
              비밀번호
            </LabeledInput>
          )}
        </CardContent>
      </Card>
    </form>
  );
};

export default BasicInfoForm;
