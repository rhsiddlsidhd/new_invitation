"use client";
import Btn from "@/components/atoms/Btn";
import useAuthentication from "@/hooks/useAuthentication";
import { useModalStore } from "@/store/modalStore";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const PreviewBtn = ({ category }: { category: string }) => {
  const { setModalOpen } = useModalStore();

  const router = useRouter();

  const { id, isAuthenticated, pending } = useAuthentication();

  const handlePreview = useCallback(
    (id: string | null) => {
      if (!isAuthenticated) {
        setModalOpen({ isOpen: true, type: "login" });
        return;
      }
      router.replace(`/preview/${category}/${id}/`);
    },
    [router, setModalOpen, isAuthenticated, category],
  );

  return (
    <Btn pending={pending} onClick={() => handlePreview(id)} className="w-full">
      미리보기
    </Btn>
  );
};

export default PreviewBtn;
