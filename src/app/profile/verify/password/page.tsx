import PasswordForm from "@/components/organisms/forms/PasswordForm";
import { hasPasswordVerifiedAuthToken } from "@/services/auth/token";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const isPasswordVerified = await hasPasswordVerifiedAuthToken();

  if (!isPasswordVerified) {
    redirect("/verify?next=/profile/password");
  }
  return <PasswordForm />;
};
export default page;
