"use client";
import React, { useActionState } from "react";
import WeddingPartyInfo from "../molecules/WeddingPartyInfo";
import WeddingInfo from "../molecules/WeddingInfo";
import WeddingParentInfo from "../molecules/WeddingParentInfo";
import WeddingThumbnail from "../molecules/WeddingThumbnail";
import WeddingGallery from "../molecules/WeddingGallery";
import { motion } from "framer-motion";
import { testAction } from "@/actions/user";

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
  const [state, action, pending] = useActionState(testAction, null);

  if (readOnly) {
    return <InvitationInfoContent readOnly={readOnly} />;
  }
  return (
    <form action={action} className="m-auto max-w-[1028px] sm:mb-12 sm:p-12">
      <InvitationInfoContent readOnly={readOnly} />
      <motion.button whileTap={{ scale: 0.95 }} type="submit">
        Create
      </motion.button>
    </form>
  );
};

export default InvitationInfoForm;
