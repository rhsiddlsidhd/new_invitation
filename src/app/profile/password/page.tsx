import PasswordForm from "@/components/PasswordForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const cookieStore = await cookies();

  if (!cookieStore.has("password-verified")) {
    redirect("/verify?next=/profile/password");
  }
  return <PasswordForm />;
};
export default page;
