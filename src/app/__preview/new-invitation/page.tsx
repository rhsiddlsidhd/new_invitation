"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import useFetchCoupleInfo from "@/hooks/useFetchCoupleInfo";
import NewInvitationPreview from "@/components/template/invitation/NewInvitationPreview";
import Spinner from "@/components/atoms/Spinner/Spinner";

const PageContent = () => {
  const { data: userInfo, isLoading, error } = useFetchCoupleInfo();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !userInfo) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>초대장 정보를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  // TODO: guestBook props need to be added
  return <NewInvitationPreview userInfo={userInfo} guestBook={[]} />;
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <PageContent />
    </Suspense>
  );
};

export default Page;
