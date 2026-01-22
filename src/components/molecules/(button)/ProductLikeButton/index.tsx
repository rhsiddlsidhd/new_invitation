"use client";
import { handleClientError } from "@/api/error";
import { fetcher } from "@/api/fetcher";
import { Badge } from "@/components/atoms/Badge/Badge";

import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const ProductLikeButton = ({
  productId,
  productLikes,
}: {
  productId: string;
  productLikes: string[];
}) => {
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [localLikes, setLocalLikes] = useState<string[]>(productLikes);
  const isLiked = userId ? localLikes.includes(userId) : false;

  const updateProductLike = async () => {
    if (!userId) return;

    setLocalLikes((prev) =>
      isLiked ? prev.filter((id) => id !== userId) : [...prev, userId],
    );

    startTransition(async () => {
      try {
        await fetcher(
          `/api/products/${productId}/like`,
          { auth: true },
          {
            method: "POST",
          },
        );
      } catch (error) {
        setLocalLikes(productLikes);
        const result = handleClientError(error);
        if (result && "message" in result) {
          toast.error(result.message);
        }
      }
    });
  };

  useEffect(() => {
    console.log("localLikes", localLikes);
  }, [localLikes]);

  return (
    <Badge
      onClick={isPending ? undefined : updateProductLike}
      variant="outline"
      className={cn(
        "aspect-square",
        isPending && "pointer-events-none cursor-not-allowed opacity-50",
      )}
    >
      <Heart className={cn(isLiked && "fill-red-500 text-red-500")} />
    </Badge>
  );
};

export default ProductLikeButton;
