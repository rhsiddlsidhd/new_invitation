import TemplateGallery from "@/components/organisms/TemplateGallery";
import { decrypt, getSession } from "@/lib/session";
import React from "react";

const page = async () => {
  let user;
  try {
    const token = await getSession();
    const payload = await decrypt(token);
    user = payload.userId;
  } catch {
    user = null;
  }

  return <TemplateGallery user={user} />;
};

export default page;
