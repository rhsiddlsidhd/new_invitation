import React from "react";
import ProfileForm from "../../components/ProfileForm";

import { getUserByToken } from "../../lib/session";
import { getUserById } from "../../services/userServices";
import { redirect } from "next/navigation";

const page = async () => {
  try {
    const payload = await getUserByToken();
    const user = await getUserById(payload.userId);
    return <ProfileForm user={user.data} />;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요";
    console.error(message);
    redirect("/auth/login");
  }
};

export default page;
