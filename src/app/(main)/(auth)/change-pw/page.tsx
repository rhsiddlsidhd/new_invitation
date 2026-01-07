import UpdatePasswordForm from "@/components/organisms/(forms)/UpdatePasswordForm";
import { getCookie } from "@/lib/cookies/get";
import { redirect } from "next/navigation";
import React from "react";

type SearchParams = Promise<{ [key: string]: string }>;
const ResetPassword = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const query = searchParams.t;
  const cookie = await getCookie("userEmail");
  if (!query || !cookie) redirect("/");
  return <UpdatePasswordForm />;
};

export default ResetPassword;
