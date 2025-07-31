import React from "react";
import ProfileForm from "../_components/ProfileForm";

import { getUserOrRedirect } from "../_lib/session";

const page = async () => {
  const user = await getUserOrRedirect();

  return <ProfileForm user={user.data} />;
};

export default page;
