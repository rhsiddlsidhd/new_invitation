import React from "react";
import ProfileForm from "../_components/ProfileForm";
import { getUserByToken } from "../_lib/session";
import { getUserById } from "../_services/userServices";
import { redirect } from "next/navigation";

const page = async () => {
  const sessionUser = await getUserByToken();

  const result = await getUserById(sessionUser!.userId);

  if (!result.success) {
    redirect("/auth/login");
  }

  return <ProfileForm user={result.data} />;
};

export default page;
