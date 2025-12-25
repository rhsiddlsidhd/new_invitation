"use client";

import { Edit, Trash2, Eye, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Btn } from "@/components/atoms/Btn/Btn";
import { Badge } from "@/components/atoms/Badge/Badge";
import { deleteProductAction } from "@/actions/deleteProductAction";
import { updateProductStatusAction } from "@/actions/updateProductStatusAction";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";

import { PremiumFeature } from "@/services/premiumFeature.service";
import { toast } from "sonner";
import { Product } from "@/services/product.service";

const ProductEditDialog = dynamic(
  () => import("./ProductEditDialog").then((mod) => mod.ProductEditDialog),
  {
    loading: () => <p>Loading...</p>,
  },
);

interface ProductTableRowProps {
  product: Product;
  premiumFeatures: PremiumFeature[];
}

export function ProductTableRow({
  product,
  premiumFeatures,
}: ProductTableRowProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [status, setStatus] = useState(product.status);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`"${product.title}" 상품을 삭제하시겠습니까?`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteProductAction(product._id);

      if (!result.success) {
        toast.error(result.error?.message || "삭제에 실패했습니다.");
        return;
      }

      toast.success(result.data.message);
      router.refresh();
    } catch (error) {
      toast.error("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (
    newStatus: "active" | "inactive" | "soldOut",
  ) => {
    setIsUpdatingStatus(true);
    setStatus(newStatus);

    try {
      const result = await updateProductStatusAction(product._id, newStatus);

      if (!result.success) {
        toast.error(result.error?.message || "상태 변경에 실패했습니다.");
        setStatus(product.status);
        return;
      }

      router.refresh();
    } catch (error) {
      toast.error("상태 변경 중 오류가 발생했습니다.");
      setStatus(product.status);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <>
      <tr className="hover:bg-muted/50 transition-colors">
        <td className="px-4 py-3">
          <div className="relative h-16 w-16 overflow-hidden rounded">
            <Image
              src={product.thumbnail || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="max-w-xs">
            <p className="truncate font-medium">{product.title}</p>
            <p className="text-muted-foreground truncate text-sm">
              {product.description}
            </p>
          </div>
        </td>
        <td className="px-4 py-3">
          <Badge variant="outline">{product.category}</Badge>
        </td>
        <td className="px-4 py-3">
          <span className="font-semibold">
            {product.price.toLocaleString()}원
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-col gap-1">
            {product.isPremium && (
              <Badge className="bg-accent text-accent-foreground w-fit">
                프리미엄
              </Badge>
            )}
            {product.feature && (
              <Badge variant="secondary" className="w-fit">
                추천
              </Badge>
            )}
          </div>
        </td>
        <td className="px-4 py-3">
          <Select
            value={status}
            onValueChange={handleStatusChange}
            disabled={isUpdatingStatus}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">판매중</SelectItem>
              <SelectItem value="inactive">비활성</SelectItem>
              <SelectItem value="soldOut">품절</SelectItem>
            </SelectContent>
          </Select>
        </td>
        <td className="px-4 py-3">
          <div className="text-muted-foreground flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{product.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              <span>{product.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <ShoppingCart className="h-3 w-3" />
              <span>{product.salesCount}</span>
            </div>
          </div>
        </td>
        <td className="px-4 py-3">
          <span className="font-mono text-sm">{product.priority}</span>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-center gap-2">
            <Btn
              size="sm"
              variant="outline"
              onClick={() => setEditDialogOpen(true)}
            >
              <Edit className="h-4 w-4" />
            </Btn>
            <Btn
              size="sm"
              variant="outline"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Btn>
          </div>
        </td>
      </tr>

      <ProductEditDialog
        open={editDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) {
            router.refresh();
          }
        }}
        product={product}
        premiumFeatures={premiumFeatures}
      />
    </>
  );
}
