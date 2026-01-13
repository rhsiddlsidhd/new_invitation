"use client";
import React from "react";
import Btn from "../../atoms/Btn";
import { InvitationInput } from "@/__domains/invitation";
import { useInvitationSubmit } from "@/__domains/invitation";
import WeddingCoupleInfoPanel from "@/components/organisms/panel/WeddingCoupleInfoPanel/index";
import WeddingLocationInfoPanel from "@/components/organisms/panel/WeddingLocationInfoPanel";
import WeddingParentInfoPanel from "@/components/organisms/panel/WeddingParnetInfoPanel";
import WeddingThumbnailPanel from "@/components/organisms/panel/WeddingThumbnailPanel";
import WeddingGalleryPanel from "@/components/organisms/panel/WeddingGalleryPanel";

const InvitationInfoContent = ({ readOnly }: { readOnly: boolean }) => {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">청첩장 정보</h3>
      <div className="flex flex-col gap-4">
        {/* Groom && Bride Info */}
        <WeddingCoupleInfoPanel readOnly={readOnly} />
        <hr className="my-2 border-gray-200" />
        {/* Wedding Info */}
        <WeddingLocationInfoPanel readOnly={readOnly} />
        <hr className="my-2 border-gray-200" />
        {/* 부모 정보 */}
        <WeddingParentInfoPanel readOnly={readOnly} />
        <hr className="my-2 border-gray-200" />
        {/* 썸네일 (최대 2장) */}
        <WeddingThumbnailPanel readOnly={readOnly} />
        <hr className="my-2 border-gray-200" />
        {/* 갤러리 Preview */}
        <WeddingGalleryPanel readOnly={readOnly} />
      </div>
    </div>
  );
};

const InvitationInfoForm = ({
  readOnly,
  data,
}: {
  readOnly: boolean;
  data?: InvitationInput;
}) => {
  const { handleSubmit, isSubmitting } = useInvitationSubmit(data);

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto flex max-w-[1028px] flex-col p-2 sm:mb-24"
    >
      <InvitationInfoContent readOnly={readOnly} />
      {!readOnly && (
        <Btn
          className="my-4 ml-auto w-1/4 bg-blue-300"
          type="submit"
          pending={isSubmitting}
        >
          {isSubmitting ? "제출 중..." : "제출"}
        </Btn>
      )}
    </form>
  );
};

export default InvitationInfoForm;
