"use client";
import { handleClientError } from "@/api/error";
import { fetcher } from "@/api/fetcher";
import { Badge } from "@/components/atoms/Badge/Badge";
import { cn } from "@/lib/utils";
import useAuthStore from "@/store/auth.store";
import { Heart } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const ProductLikeButton = ({
  productId,
  productLikes,
}: {
  productId: string;
  productLikes: string[];
}) => {
  const userId = useAuthStore((state) => state.userId);
  const [localLikes, setLocalLikes] = useState<string[]>(productLikes);
  const isLiked = userId ? localLikes.includes(userId) : false;

  const updateProductLike = () => {
    if (!userId) return;

    const previousLikes = localLikes;

    // Optimistic update
    setLocalLikes((prev) =>
      isLiked ? prev.filter((id) => id !== userId) : [...prev, userId],
    );

    // startTransition 밖에서 비동기 작업 수행
    fetcher(
      `/api/products/${productId}/like`,
      { auth: true },
      { method: "POST" },
    )
      .then(() => {
        // 성공 시 추가 작업이 필요하면 여기서 수행
      })
      .catch((error) => {
        // 실패 시 롤백
        setLocalLikes(previousLikes);
        const result = handleClientError(error);
        if (result && "message" in result) {
          toast.error(result.message);
        }
      });
  };

  return (
    <Badge
      onClick={updateProductLike}
      variant="outline"
      className={cn("aspect-square")}
    >
      <Heart className={cn(isLiked && "fill-red-500 text-red-500")} />
    </Badge>
  );
};

export default ProductLikeButton;
