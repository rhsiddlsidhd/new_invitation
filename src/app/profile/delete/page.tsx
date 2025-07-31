import DeleteForm from "@/app/_components/DeleteForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const cookieStore = await cookies();
  const isVerify = cookieStore.get("password-verified");

  if (!isVerify?.value || isVerify.value !== "true") {
    redirect("/verify?next=/profile/delete");
  }

  return <DeleteForm />;
};
export default page;
