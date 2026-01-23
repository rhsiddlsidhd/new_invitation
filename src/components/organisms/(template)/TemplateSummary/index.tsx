"use client";

import { Eye, Share2 } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Btn } from "@/components/atoms/Btn/Btn";
import { Product } from "@/services/product.service";

import { categoryLabels, isProductCategory } from "@/utils/category";

import { calculatePrice } from "@/utils/price";
import { PremiumFeature } from "@/services/premiumFeature.service";
import ProductLikeButton from "@/components/molecules/(button)/ProductLikeButton";
import ProductOptions from "../../(product)/ProductOptions";
import { useRouter } from "next/navigation";
import LoaderThumbnail from "@/components/atoms/LoaderThumbnail";

const PREVIEW_ID = process.env.NEXT_PUBLIC_PREVIEW_COUPLEINFO_ID;
if (!PREVIEW_ID) throw new Error("PREVIEW_ID is not defined");

export function TemplateSummary({
  product,
  options,
}: {
  product: Product;
  options: PremiumFeature[];
}) {
  const router = useRouter();
  const discountedPrice = useMemo(() => {
    return calculatePrice(product.price, product.discount);
  }, [product.price, product.discount]);

  return (
    <div className="mb-16">
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left side - Thumbnail */}

        <div className="group bg-muted border-border relative aspect-square overflow-hidden rounded-2xl border shadow-lg">
          <LoaderThumbnail
            src={product.thumbnail}
            alt={`${product.title} 모바일 청첩장 썸네일`}
          />
          <div className="absolute top-4 right-4 flex gap-2">
            {product.feature && (
              <Badge className="bg-accent text-accent-foreground">추천</Badge>
            )}
            {product.isPremium && (
              <Badge className="bg-accent text-accent-foreground">
                프리미엄
              </Badge>
            )}
          </div>
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Btn
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
            </Btn>
          </div>
        </div>

        {/* Right side - Product Info */}
        <div className="space-y-6">
          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <Badge variant="outline">
                {isProductCategory(product.category) &&
                  categoryLabels[product.category]}
              </Badge>
              <div className="grid grid-cols-2 gap-2">
                <ProductLikeButton
                  productLikes={product.likes}
                  productId={product._id}
                />
                <Badge variant="outline" className="aspect-square">
                  <Share2 />
                </Badge>
              </div>
            </div>
            <h1 className="text-foreground mb-3 text-lg font-bold text-balance">
              {product.title}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed text-balance">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="border-border border-y py-6">
            {product.discount && product.discount.value > 0 ? (
              <>
                {/* 할인이 있을 때: 할인율/금액 + 원가(취소선) */}
                <div className="flex items-baseline gap-2">
                  <span className="text-primary text-sm font-bold">
                    {product.discount.type === "rate"
                      ? `${Math.round(product.discount.value * 100)}%`
                      : `${product.discount.value.toLocaleString()}원 할인`}
                  </span>
                  <span className="text-muted-foreground/40 text-sm line-through">
                    {product.price.toLocaleString()}원
                  </span>
                </div>

                {/* 최종 계산된 가격 */}
                <div className="text-destructive text-lg font-bold">
                  {discountedPrice.toLocaleString()}원
                  <span className="ml-1 text-sm font-normal">할인 적용가</span>
                  <input type="hidden" defaultValue={discountedPrice} />
                </div>
              </>
            ) : (
              <div className="text-primary text-lg font-bold">
                {product.price.toLocaleString()}원
                <input type="hidden" defaultValue={product.price} />
              </div>
            )}
          </div>

          {/* Options */}
          <ProductOptions product={product} options={options} />

          {/* Additional Info */}
          <div className="bg-muted space-y-3 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="bg-primary mt-2 h-2 w-2 shrink-0 rounded-full" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                구매 후 즉시 사용 가능하며, 무제한으로 수정할 수 있습니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary mt-2 h-2 w-2 shrink-0 rounded-full" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                평생 호스팅이 포함되어 있어 별도의 유지비가 없습니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary mt-2 h-2 w-2 shrink-0 rounded-full" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                모바일과 데스크톱 모두에서 완벽하게 작동합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
