import DeleteForm from "@/components/organisms/forms/DeleteForm";
import { decrypt, getSession, hasPasswordVerified } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  try {
    const token = await getSession();
    const payload = await decrypt(token);
    const isPasswordVerified = await hasPasswordVerified();

    if (!isPasswordVerified) {
      redirect("/verify?next=/profile/delete");
    }

    return <DeleteForm user={payload.userId} />;
  } catch {
    redirect("/");
  }
};
export default page;
