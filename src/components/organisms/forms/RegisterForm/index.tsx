"use client";

import Alert from "@/components/atoms/Alert";
import Btn from "@/components/atoms/Btn";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import { useModalStore } from "@/store/modalStore";
import React, { useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import { signUp } from "@/actions/auth/signUp";
import { registerFields } from "./constant";

const RegisterForm = () => {
  const [state, action, pending] = useActionState(signUp, null);
  const { setModalOpen } = useModalStore();

  useEffect(() => {
    if (!state) return;
    if (state && state.success) {
      alert(state.data.message);
      setModalOpen({ isOpen: true, type: "login" });
    }
  }, [state, setModalOpen]);

  return (
    <div>
      {state && !state.success && state.error.code !== 500 && (
        <Alert type="error">{state.error.message}</Alert>
      )}

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
          onClick={() => setModalOpen({ isOpen: true, type: "login" })}
          className="cursor-pointer text-[#007cba]"
        >
          이미 계정이 있으신가요? 로그인
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterForm;
