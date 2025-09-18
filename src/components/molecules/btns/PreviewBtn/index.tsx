"use client";
import Btn from "@/components/atoms/Btn";
import useAuthentication from "@/hooks/useAuthentication";
import { useModalStore } from "@/store/modalStore";

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const PreviewBtn = ({
  category,

  productId,
}: {
  category: string;

  productId: string;
}) => {
  const { setModalOpen } = useModalStore();
  const router = useRouter();
  const { id, isAuthenticated, pending } = useAuthentication();

  const handlePreview = useCallback(
    (id: string | null) => {
      if (!isAuthenticated) {
        setModalOpen({ isOpen: true, type: "login" });
        return;
      }
      router.replace(`/preview/${category}/${productId}?u=${id}`);
    },
    [router, setModalOpen, isAuthenticated, category, productId],
  );

  return (
    <Btn pending={pending} onClick={() => handlePreview(id)} className="w-full">
      미리보기
    </Btn>
  );
};

export default PreviewBtn;
