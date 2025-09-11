import DeleteForm from "@/components/organisms/forms/DeleteForm";
import { decrypt } from "@/lib/jose";
import {
  getAuthToken,
  hasPasswordVerifiedAuthToken,
} from "@/services/authService/token";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  try {
    const token = await getAuthToken();
    const payload = await decrypt(token);
    const isPasswordVerified = await hasPasswordVerifiedAuthToken();

    if (!isPasswordVerified) {
      redirect("/verify?next=/profile/delete");
    }

    return <DeleteForm user={payload.userId} />;
  } catch {
    redirect("/");
  }
};
export default page;
