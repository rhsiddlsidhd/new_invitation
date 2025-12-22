import { LoginForm } from "@/components/organisms/(forms)/LoginForm";
import { getCookie } from "@/lib/cookies/get";
import { decrypt } from "@/lib/token";
import { redirect } from "next/navigation";

import React from "react";

const LoginPage = async () => {
  const cookie = await getCookie("entry");
  if (!cookie) redirect("/");

  const isVerify = await decrypt({ token: cookie.value, type: "ENTRY" });
  if (!isVerify) redirect("/");

  return <LoginForm />;
};

export default LoginPage;
