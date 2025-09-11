import PasswordForm from "@/components/organisms/forms/PasswordForm";
import {
  getAuthToken,
  hasPasswordVerifiedAuthToken,
} from "@/services/authService/token";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  try {
    await getAuthToken();

    const isPasswordVerified = await hasPasswordVerifiedAuthToken();

    if (!isPasswordVerified) {
      redirect("/verify?next=/profile/delete");
    }
    return <PasswordForm />;
  } catch {
    redirect("/");
  }
};
export default page;
