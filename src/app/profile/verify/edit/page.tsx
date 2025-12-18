import EditForm from "@/components/organisms/forms/EditForm";
import { hasPasswordVerifiedAuthToken } from "@/domains/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const isPasswordVerified = await hasPasswordVerifiedAuthToken();

  if (!isPasswordVerified) {
    redirect("/verify?next=/profile/edit");
  }

  return <EditForm />;
};

export default page;
