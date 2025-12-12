import ChangePWForm from "@/components/template/ChangePWForm";
import { decrypt } from "@/lib/jose";
import { redirect } from "next/navigation";
import React from "react";

type SearchParams = Promise<{ [key: string]: string }>;
const ResetPassword = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const query = searchParams.t;
  const payload = await decrypt(query);

  if (!query || !payload) redirect("/");
  return <ChangePWForm email={payload.email} />;
};

export default ResetPassword;
