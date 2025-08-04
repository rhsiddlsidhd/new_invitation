import React from "react";
import ProfileForm from "../../components/ProfileForm";

import { decrypt, getSession } from "../../lib/session";
import { getUserById } from "../../services/userServices";
import { redirect } from "next/navigation";

const page = async () => {
  try {
    const token = await getSession();
    const payload = await decrypt(token);
    const user = await getUserById(payload.userId);
    return <ProfileForm user={user.data} />;
  } catch {
    redirect("/auth/login");
  }
};

export default page;
