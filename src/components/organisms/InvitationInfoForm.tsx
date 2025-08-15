"use client";
import React, { useActionState, useEffect } from "react";
import WeddingPartyInfo from "../molecules/WeddingPartyInfo";
import WeddingInfo from "../molecules/WeddingInfo";
import WeddingParentInfo from "../molecules/WeddingParentInfo";
import WeddingThumbnail from "../molecules/WeddingThumbnail";
import WeddingGallery from "../molecules/WeddingGallery";
import { createInvitationInfo } from "@/actions/invitation";
import Btn from "../atoms/Btn";
import { useRouter } from "next/navigation";

const InvitationInfoContent = ({ readOnly }: { readOnly: boolean }) => {
  return (
    <div className="rounded-xl border border-[#ddd] bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">청첩장 정보</h3>
      <div className="flex flex-col gap-4">
        {/* Groom && Bride Info */}
        <WeddingPartyInfo readOnly={readOnly} />
        <hr className="my-2 border-gray-200" />
        {/* Wedding Info */}
        <WeddingInfo readOnly={readOnly} />
        <hr className="my-2 border-gray-200" />
        {/* 부모 정보 */}
        <WeddingParentInfo readOnly={readOnly} />
        <hr className="my-2 border-gray-200" />
        {/* 썸네일 (최대 2장) */}
        <WeddingThumbnail readOnly={readOnly} />
        <hr className="my-2 border-gray-200" />
        {/* 갤러리 Preview */}
        <WeddingGallery readOnly={readOnly} />
      </div>
    </div>
  );
};

const InvitationInfoForm = ({ readOnly }: { readOnly: boolean }) => {
  const [state, action, pending] = useActionState(createInvitationInfo, null);
  const router = useRouter();
  useEffect(() => {
    if (state && !state.success && "error" in state) {
      // 여기서만 state.error 사용 가능
      console.log(state.error);
    } else if (state && state.success) {
      alert(state.message);
      router.push("/dashboard");
    }
  }, [state, router]);

  if (readOnly) {
    return <InvitationInfoContent readOnly={readOnly} />;
  }
  return (
    <form
      action={action}
      className="m-auto flex max-w-[1028px] flex-col sm:mb-12 sm:p-12"
    >
      {/* {state && !state.success && state.error } */}
      <InvitationInfoContent readOnly={readOnly} />
      <div className="ml-auto w-1/4">
        <Btn className="my-4 bg-blue-300" type="submit">
          제출
        </Btn>
      </div>
    </form>
  );
};

export default InvitationInfoForm;
