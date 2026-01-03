"use client";
import { handleClientError } from "@/api/error";
import { fetcher } from "@/api/fetcher";
import { Btn } from "@/components/atoms/Btn/Btn";

import useAuth from "@/hooks/useAuth";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

const ProductLikeButton = ({
  productId,
  productLikes,
}: {
  productId: string;
  productLikes: string[];
}) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [localLikes, setLocalLikes] = useState<string[]>(productLikes);
  const isLiked = userId ? localLikes.includes(userId) : false;

  const updateProductLike = async () => {
    if (!userId) return;

    setLocalLikes((prev) =>
      isLiked ? prev.filter((id) => id !== userId) : [...prev, userId],
    );

    try {
      await fetcher(
        `/api/products/${productId}/like`,
        {
          method: "POST",
        },
        { auth: true },
      );

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setLocalLikes(productLikes);
      handleClientError(error);
    }
  };

  return (
    <Btn
      onClick={updateProductLike}
      variant="outline"
      size="lg"
      className="flex-1 bg-transparent"
      disabled={isPending}
    >
      <Heart className={isLiked ? "fill-red-500 text-red-500" : ""} />
      좋아요
    </Btn>
  );
};

export default ProductLikeButton;
