"use client";
import { PAGE_TITLE } from "@/contants/page";
import { isPageTitle } from "@/utils/page";
import { usePathname } from "next/navigation";
import React from "react";

const PageTitle = () => {
  const pathname = usePathname();
  const key = pathname.replace("/", "");

  return (
    <div className="mb-8">
      <h1 className="text-foreground mb-2 text-3xl font-bold md:text-4xl">
        {/* 결제하기 */}
        {/* {PAGET_TITLE[isPageTitle[]]} */}
        {isPageTitle(key) && PAGE_TITLE[key].title}
      </h1>
      <p className="text-muted-foreground">
        {/* 안전하고 빠른 결제를 진행해주세요 */}
        {isPageTitle(key) && PAGE_TITLE[key].subTitle}
      </p>
    </div>
  );
};

export default PageTitle;
