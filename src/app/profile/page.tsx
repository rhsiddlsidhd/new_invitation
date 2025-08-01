import React from "react";
import ProfileForm from "../_components/ProfileForm";

import { getUserOrRedirect } from "../_lib/session";

const page = async () => {
  // 세션에서 사용자 정보를 가져오고, 없으면 로그인 페이지로 리다이렉트
  const user = await getUserOrRedirect();

  return <ProfileForm user={user.data} />;
};

export default page;
