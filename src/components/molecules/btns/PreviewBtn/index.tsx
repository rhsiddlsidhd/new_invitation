"use client";
import Btn from "@/components/atoms/Btn";
import useAuthentication from "@/hooks/useAuthentication";
import { useModalStore } from "@/store/modalStore";
import { useSetProductColor } from "@/store/productStore";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const PreviewBtn = ({
  category,
  color,
  productId,
}: {
  category: string;
  color: string;
  productId: string;
}) => {
  const { setModalOpen } = useModalStore();
  const router = useRouter();
  const { id, isAuthenticated, pending } = useAuthentication();
  const setColor = useSetProductColor();

  useEffect(() => {
    if (color) setColor(color);
  }, [color, setColor]);

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
