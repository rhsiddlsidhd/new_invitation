"use client";
import { Btn } from "@/components/atoms/Btn/Btn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import ControlledInputField from "./ControlledInputField";
import clsx from "clsx";
import { Save } from "lucide-react";
import React, { useCallback, useState } from "react";

interface ChangePasswordField {
  id: string;
  title: string;
  name: string;
  type: string;
  placeholder: string;
}

const passwordFields: ChangePasswordField[] = [
  {
    id: "currentPassword",
    title: "현재 비밀번호",
    name: "currentPassword",
    type: "password",
    placeholder: "현재 비밀번호를 입력하세요",
  },
  {
    id: "newPassword",
    title: "새 비밀번호",
    name: "newPassword",
    type: "password",
    placeholder: "새 비밀번호를 입력하세요",
  },
  {
    id: "confirmPassword",
    title: "새 비밀번호 확인",
    name: "confirmPassword",
    type: "password",
    placeholder: "새 비밀번호를 다시 입력하세요",
  },
];

const ChangePasswordTestForm = () => {
  const [passwordToggle, setPasswordToggle] = useState<boolean>(false);
  const [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const isMismatch =
    state.newPassword !== state.confirmPassword && state.confirmPassword !== "";
  const isSubmitDisabled =
    !state.currentPassword || !state.newPassword || isMismatch;

  return (
    <form className="space-y-6">
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div>
            <CardTitle>비밀번호 변경</CardTitle>
            <CardDescription>새로운 비밀번호를 설정합니다</CardDescription>
          </div>

          <div className="flex justify-end gap-2">
            <Btn
              type="submit"
              disabled={isSubmitDisabled}
              className={clsx(
                `${passwordToggle ? "cursor-pointer opacity-100" : "pointer-events-none opacity-0"}`,
              )}
            >
              <Save className="mr-2 h-4 w-4" />
              저장하기
            </Btn>

            <Btn
              type="button"
              variant="outline"
              onClick={() => setPasswordToggle(!passwordToggle)}
            >
              {passwordToggle ? "닫기" : "변경하기"}
            </Btn>
          </div>
        </CardHeader>
        {passwordToggle && (
          <CardContent className="space-y-4">
            {passwordFields.map((field) => (
              <ControlledInputField
                key={field.id}
                id={field.id}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={state[field.name as keyof typeof state]}
                onChange={handleChange}
                error={
                  field.name === "confirmPassword" && isMismatch
                    ? "비밀번호가 일치하지 않습니다"
                    : undefined
                }
              >
                {field.title}
              </ControlledInputField>
            ))}
          </CardContent>
        )}
      </Card>
    </form>
  );
};

export default ChangePasswordTestForm;
