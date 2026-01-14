import UpdatePasswordForm from "@/components/organisms/(forms)/UpdatePasswordForm";

import { redirect } from "next/navigation";
import React from "react";

type SearchParams = Promise<{ [key: string]: string }>;
const ResetPassword = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;

  const query = searchParams.t;

  if (!query) redirect("/");

  return <UpdatePasswordForm token={query} />;
};

export default ResetPassword;
