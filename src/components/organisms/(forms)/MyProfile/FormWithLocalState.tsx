"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import InputUncontrolledWithCounter from "@/components/molecules/field/InputUncontrolledWithCounter";
import React, { useRef } from "react";

const passwordFields = [
  { id: "currentPassword1", name: "currentPassword1", label: "현재 비밀번호" },
  { id: "newPassword1", name: "newPassword1", label: "새 비밀번호" },
  { id: "confirmPassword1", name: "confirmPassword1", label: "새 비밀번호 확인" },
];

const FormWithLocalState = () => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>모범 사례: Local State</CardTitle>
            <CardDescription>
              Input이 자신의 상태를 직접 관리합니다.
            </CardDescription>
          </div>
          <span className="text-sm text-pink-500 font-mono font-bold">
            Form Renders: {renderCount.current}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Input에 입력해도 Form의 렌더링 카운트는 오르지 않습니다.
        </p>
        {passwordFields.map((field) => (
          <InputUncontrolledWithCounter
            key={field.id}
            id={field.id}
            name={field.name}
            label={field.label}
            type="password"
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default FormWithLocalState;
