import ChangePWForm from "@/components/template/ChangePWForm";
import { decrypt } from "@/lib/jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type SearchParams = Promise<{ [key: string]: string }>;
const ResetPassword = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const query = searchParams.t;
  const cookieStore = await cookies();
  console.log(cookieStore);
  const email = cookieStore.has("userEmail");
  console.log("email>>", email);

  if (!query || !email) redirect("/");
  return <ChangePWForm />;
};

export default ResetPassword;
