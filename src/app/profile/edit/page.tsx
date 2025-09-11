import EditForm from "@/components/organisms/forms/EditForm";
import { getSession, hasPasswordVerified } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  try {
    await getSession();
    const isPasswordVerified = await hasPasswordVerified();

    if (!isPasswordVerified) {
      redirect("/verify?next=/profile/delete");
    }

    return <EditForm />;
  } catch {
    redirect("/");
  }
};

export default page;
