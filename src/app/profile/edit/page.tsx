import EditForm from "@/components/organisms/forms/EditForm";
import { getSession } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  try {
    await getSession();
    const cookieStore = await cookies();
    if (!cookieStore.has("password-verified")) {
      redirect("/verify?next=/profile/edit");
    }

    return <EditForm />;
  } catch {
    redirect("/");
  }
};

export default page;
