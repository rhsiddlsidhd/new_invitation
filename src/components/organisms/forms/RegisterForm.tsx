"use client";

import { signUp } from "@/actions/auth";
import Alert from "@/components/atoms/Alert";
import Btn from "@/components/atoms/Btn";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import { useModalStore } from "@/store/modalStore";
import React, { useActionState, useEffect } from "react";
import { motion } from "framer-motion";

interface RegisterField {
  type: "text" | "password" | "email";
  name: string;
  required: boolean;
  label: string;
  autoComplete: string;
}

const RegisterForm = () => {
  const [state, action, pending] = useActionState(signUp, null);
  const { setModalOpen } = useModalStore();

  useEffect(() => {
    if (state && state.success) {
      setModalOpen(true, "login");
    }
  }, [state, setModalOpen]);

  const registerFields: RegisterField[] = [
    {
      type: "email",
      name: "email",
      required: true,
      label: "이메일:",
      autoComplete: "email",
    },
    {
      type: "text",
      name: "userId",
      required: true,
      label: "사용자 ID:",
      autoComplete: "username",
    },
    {
      type: "password",
      name: "password",
      required: true,
      label: "비밀번호:",
      autoComplete: "new-password",
    },
    {
      type: "password",
      name: "confirmPassword",
      required: true,
      label: "비밀번호 확인:",
      autoComplete: "new-password",
    },
  ];

  return (
    <div>
      {state && <Alert type="error">{state.message}</Alert>}

      <form action={action}>
        {registerFields.map((field) => (
          <div key={field.name} className="my-4">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              type={field.type}
              name={field.name}
              required={field.required}
              autoComplete={field.autoComplete}
            />
          </div>
        ))}

        <Btn
          type="submit"
          pending={pending}
          bgColor="bg-[#007cba]"
          className="w-full"
        >
          {pending ? "가입 중..." : "회원가입"}
        </Btn>
      </form>

      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <motion.div
          whileHover={{ opacity: 0.75 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setModalOpen(true, "login")}
          className="cursor-pointer text-[#007cba]"
        >
          이미 계정이 있으신가요? 로그인
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterForm;
