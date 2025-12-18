import { LoginForm } from "@/components/template/LoginForm";
import { entryDecrypt } from "@/shared/lib/jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import React from "react";

const LoginPage = async () => {
  const cookie = await cookies();
  const entry = cookie.get("entry");
  if (!entry) redirect("/");
  const isVerify = await entryDecrypt(entry.value);
  if (!isVerify) redirect("/");

  return <LoginForm />;
};

export default LoginPage;
