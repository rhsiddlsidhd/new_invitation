import DeleteForm from "@/components/DeleteForm";
import { decrypt, getSession, hasPasswordVerified } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const isPasswordVerified = await hasPasswordVerified();

  if (!isPasswordVerified) {
    redirect("/verify?next=/profile/delete");
  }

  const token = await getSession();
  const payload = await decrypt(token);

  return <DeleteForm user={payload.userId} />;
};
export default page;
