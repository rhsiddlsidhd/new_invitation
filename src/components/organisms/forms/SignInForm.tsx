"use client";
import { signIn } from "@/actions/auth";
import { useModalStore } from "@/store/modalStore";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import Alert from "../../atoms/Alert";
import Label from "../../atoms/Label";
import Input from "../../atoms/Input";
import Btn from "../../atoms/Btn/index";
import { motion } from "framer-motion";
import useAuthStore from "./../../../store/authStore";

interface SignInFields {
  type: "text" | "password";
  name: string;
  required: boolean;
  autoComplete: string;
  label: string;
}

const SignInForm = () => {
  const [state, action, pending] = useActionState(signIn, null);
  const { setModalOpen, nextPath } = useModalStore();
  const { setIsAuthenticated } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    const success = state && state.success;
    if (!success) return;
    setIsAuthenticated(true);
    setModalOpen({ isOpen: false });
    if (nextPath) router.push(nextPath);
  }, [state, setModalOpen, router, nextPath, setIsAuthenticated]);

  const signInFields: SignInFields[] = [
    {
      type: "text",
      name: "userId",
      required: true,
      autoComplete: "username",
      label: "아이디:",
    },
    {
      type: "password",
      name: "password",
      required: true,
      autoComplete: "current-password",
      label: "비밀번호:",
    },
  ];

  return (
    <div>
      {state && <Alert type="error">{state.message}</Alert>}

      <form action={action}>
        {signInFields.map((field) => (
          <div className="my-4" key={field.name}>
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
          {pending ? "로그인 중..." : "로그인"}
        </Btn>
      </form>

      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <motion.button
          whileHover={{ opacity: 0.75 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setModalOpen({ isOpen: true, type: "register" })}
          // true, "register"
          className="cursor-pointer text-[#007cba]"
        >
          계정이 없으신가요? 회원가입
        </motion.button>
      </div>
    </div>
  );
};

export default SignInForm;
