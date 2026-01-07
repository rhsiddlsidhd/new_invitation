import { HTTPError } from "@/api/type";
import { CoupleInfoForm } from "@/components/organisms/(forms)/CoupleInfoForm";
import { getCookie } from "@/lib/cookies/get";
import { decrypt } from "@/lib/token";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  const { q } = await searchParams;

  if (!q) {
    throw new HTTPError("잘못된 접근입니다.", 400);
  }

  const cookie = await getCookie("token");
  if (!cookie) return redirect("/login");

  const { payload } = await decrypt({ token: cookie.value, type: "REFRESH" });
  if (!payload.id) return redirect("/login");

  // const coupleInfo = await getCoupleInfoById(q);

  // if (!coupleInfo) {
  //   throw new HTTPError("정보를 찾을 수 없습니다.", 404);
  // }

  // // Check if user owns this coupleInfo
  // if (coupleInfo.userId.toString() !== payload.id) {
  //   throw new HTTPError("접근 권한이 없습니다.", 403);
  // }
  // console.log(coupleInfo);
  return <CoupleInfoForm type={"edit"} />;
};

export default Page;
