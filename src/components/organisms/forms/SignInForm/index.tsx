"use client";
import { useModalStore } from "@/store/modalStore";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { signIn } from "@/actions/auth/signIn";
import useAuthStore from "@/store/authStore";
import Alert from "@/components/atoms/Alert";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Btn from "@/components/atoms/Btn";
import { motion } from "framer-motion";
import { signInFields } from "./constant";

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

  return (
    <div>
      {state && !state.success && (
        <Alert type="error">{state.error.message}</Alert>
      )}

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
          className="cursor-pointer text-[#007cba]"
        >
          계정이 없으신가요? 회원가입
        </motion.button>
      </div>
    </div>
  );
};

export default SignInForm;
