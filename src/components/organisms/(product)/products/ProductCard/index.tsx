"use client";

import { Eye } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/atoms/card";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Product } from "@/services/product.service";
import ProductThumbnail from "@/components/molecules/ProductThumbnail";
import { calculatePrice } from "@/utils/price";
import { useRouter } from "next/navigation";
import { SubCategory, subCategoryLabels } from "@/utils/category";

const PREVIEW_ID = process.env.NEXT_PUBLIC_PREVIEW_COUPLEINFO_ID;
if (!PREVIEW_ID) throw new Error("PREVIEW_ID is not defined");

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  return (
    <Card
      className="group border-border cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
      onClick={() => router.push(`/products/${product._id}`)}
    >
      <CardContent className="p-0">
        <div className="bg-muted relative aspect-3/4 overflow-hidden">
          <ProductThumbnail
            src={product.thumbnail}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            alt={`${product.title} 썸네일`}
          />
          <div className="absolute top-3 right-3 flex gap-2">
            {product.isPremium && (
              <Badge className="bg-accent text-accent-foreground">
                프리미엄
              </Badge>
            )}

            {product.feature && (
              <Badge className="bg-accent text-accent-foreground">추천</Badge>
            )}
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/preview/${product._id}?u=${PREVIEW_ID}`);
              }}
              className="cursor-pointer"
            >
              <Eye className="mr-1 h-4 w-4" />
              샘플보기
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="w-full">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="text-foreground text-lg leading-tight font-semibold">
              {product.title}
            </h3>
            <Badge variant="outline" className="shrink-0 text-xs">
              {subCategoryLabels[product.subCategory as SubCategory] ?? product.subCategory}
            </Badge>
          </div>
          <div>
            {product.discount && product.discount.value > 0 ? (
              <>
                {/* 할인이 있을 때: 할인율/금액 + 원가(취소선) */}
                <div className="flex items-baseline gap-2">
                  <span className="text-primary text-sm font-bold">
                    {product.discount.discountType === "rate"
                      ? `${Math.round(product.discount.value * 100)}%`
                      : `${product.discount.value.toLocaleString()}원 할인`}
                  </span>
                  <span className="text-muted-foreground/40 text-sm line-through">
                    {product.price.toLocaleString()}원
                  </span>
                </div>

                {/* 최종 계산된 가격 */}
                <div className="text-destructive text-lg font-bold">
                  {calculatePrice(
                    product.price,
                    product.discount,
                  ).toLocaleString()}
                  원
                </div>
              </>
            ) : (
              <>
                {/* 할인이 없을 때: 깔끔하게 본 가격만 표시 */}
                <div className="text-primary text-lg font-bold">
                  {product.price.toLocaleString()}원
                  <input type="hidden" defaultValue={product.price} />
                </div>
              </>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
