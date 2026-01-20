"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import InputControlledWithCounter from "@/components/molecules/field/InputControlledWithCounter";
import React, { useRef, useState } from "react";

const passwordFields = [
  { id: "currentPassword2", name: "currentPassword", label: "현재 비밀번호" },
  { id: "newPassword2", name: "newPassword", label: "새 비밀번호" },
  { id: "confirmPassword2", name: "confirmPassword", label: "새 비밀번호 확인" },
];

const FormWithLiftedState = () => {
  const [formState, setFormState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const renderCount = useRef(0);
  renderCount.current += 1;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>비교 대상: Lifted State</CardTitle>
            <CardDescription>
              Form이 모든 Input의 상태를 관리합니다.
            </CardDescription>
          </div>
          <span className="text-sm text-blue-500 font-mono font-bold">
            Form Renders: {renderCount.current}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Input에 입력하면 Form의 렌더링 카운트가 함께 오릅니다.
        </p>
        {passwordFields.map((field) => (
          <InputControlledWithCounter
            key={field.id}
            id={field.id}
            name={field.name}
            label={field.label}
            type="password"
            value={formState[field.name as keyof typeof formState]}
            onChange={handleChange}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default FormWithLiftedState;
