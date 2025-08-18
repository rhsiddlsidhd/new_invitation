"use client";
import React, { useActionState, useEffect, useState } from "react";
import WeddingPartyInfo from "../molecules/WeddingPartyInfo";
import WeddingInfo from "../molecules/WeddingInfo";
import WeddingParentInfo from "../molecules/WeddingParentInfo";
import WeddingThumbnail from "../molecules/WeddingThumbnail";
import WeddingGallery from "../molecules/WeddingGallery";
import { createInvitationInfo } from "@/actions/invitation";
import Btn from "../atoms/Btn";
import { useRouter } from "next/navigation";
import { InvitationInput } from "@/models/invitationSchma";
import { useUserStore } from "@/store/userStore";

const InvitationInfoContent = ({
  readOnly,
  errors,
}: {
  readOnly: boolean;
  errors?: Record<string, string[] | undefined> | undefined;
}) => {
  console.log("errors", errors);
  return (
    <div className="w-full rounded-xl border border-[#ddd] bg-white p-6">
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

const InvitationInfoForm = ({
  readOnly,
  data,
}: {
  readOnly: boolean;
  data?: InvitationInput;
}) => {
  const [state, action, pending] = useActionState(createInvitationInfo, null);
  const { setUser, clearUser, setErrors, clearErrors } = useUserStore();

  const router = useRouter();
  useEffect(() => {
    if (state && !state.success && "error" in state && state.error) {
      // 여기서만 state.error 사용 가능
      setErrors(state.error);
    } else if (state && state.success) {
      alert(state.message);
      clearErrors();
      router.push("/dashboard");
    }
  }, [state, router, setErrors, clearErrors]);

  useEffect(() => {
    if (data) {
      setUser(data);
    } else {
      clearUser();
    }
  }, [data, setUser, clearUser]);

  return (
    <form
      action={action}
      className="m-auto flex max-w-[1028px] flex-col sm:mb-24"
    >
      {/* {state && !state.success && state.error } */}
      <InvitationInfoContent
        readOnly={readOnly}
        errors={
          state && "error" in state && state.error ? state.error : undefined
        }
      />
      {!readOnly && (
        <div className="ml-auto w-1/4">
          <Btn className="my-4 w-full bg-blue-300" type="submit">
            제출
          </Btn>
        </div>
      )}
    </form>
  );
};

export default InvitationInfoForm;
