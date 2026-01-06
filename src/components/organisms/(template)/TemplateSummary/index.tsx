"use client";
import Link from "next/link";
import { Eye, ShoppingCart, Share2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Btn } from "@/components/atoms/Btn/Btn";
import { Product } from "@/services/product.service";
import Thumbnail from "@/components/atoms/Thumbnail";
import { useIsMobile } from "@/hooks/use-mobile";
import { categoryLabels, isProductCategory } from "@/utils/category";

import { calculatePrice } from "@/utils/price";
import { PremiumFeature } from "@/services/premiumFeature.service";
import ProductLikeButton from "@/components/molecules/(button)/ProductLikeButton";
import { CheckoutProductData } from "@/types/checkout.d";
import ProductOptions from "../../(product)/ProductOptions";
import { useRouter } from "next/navigation";
import { SelectFeatureDto } from "@/schemas/order.schema";

export function TemplateSummary({
  product,
  options,
}: {
  product: Product;
  options: PremiumFeature[];
}) {
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const isMobile = useIsMobile();
  const router = useRouter();
  const discountedPrice = useMemo(() => {
    return calculatePrice(product.price, product.discount);
  }, [product.price, product.discount]);

  const selectedFeatures: SelectFeatureDto[] = useMemo(() => {
    return selectedOptionIds.map((id) => {
      const selectedOpt = options.find((opt) => opt._id.toString() === id);
      if (!selectedOpt) {
        throw new Error(`Selected option with ID ${id} not found.`);
      }

      return {
        featureId: selectedOpt._id.toString(),
        code: selectedOpt.code,
        label: selectedOpt.label,
        price: selectedOpt.additionalPrice,
      };
    });
  }, [selectedOptionIds, options]);

  const selectedFeaturesPrice = useMemo(() => {
    return selectedFeatures.reduce((sum, opt) => sum + opt.price, 0);
  }, [selectedFeatures]);

  const finalProductPrice = useMemo(() => {
    return discountedPrice + selectedFeaturesPrice;
  }, [discountedPrice, selectedFeaturesPrice]);

  const handlePurchase = useCallback(() => {
    const quantity = 1;
    /**
     * sessionStoarge 전달해야 하는 값
     * originalPrice 원가
     * discountedPrice 할인가
     */
    const checkoutData: CheckoutProductData = {
      _id: product._id.toString(),
      title: product.title,
      // 상품 원가
      originalPrice: product.price,
      // 상품 할인가
      discountedPrice,
      discount: { type: product.discount.type, value: product.discount.value },
      thumbnail: product.thumbnail,
      selectedFeatures,
      quantity: quantity,
      productTotalPrice: finalProductPrice * quantity,
    };

    try {
      sessionStorage.setItem("checkoutItems", JSON.stringify(checkoutData));
      router.push("/couple-info");
    } catch (error) {
      console.error("Failed to save to sessionStorage:", error);
      alert("상품 정보를 저장하는 데 실패했습니다. 다시 시도해 주세요.");
    }
  }, [
    product.price,
    product._id,
    product.title,
    product.thumbnail,
    product.discount,
    discountedPrice,
    selectedFeatures,
    finalProductPrice,
    router,
  ]);

  return (
    <div className="mb-16">
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left side - Thumbnail */}

        <div className="bg-muted border-border relative aspect-square overflow-hidden rounded-2xl border shadow-lg">
          <Thumbnail
            src={product.thumbnail}
            widthPx={!isMobile ? 940 : 940 / 2}
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
        </div>

        {/* Right side - Product Info */}
        <div className="space-y-6">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="outline">
                {isProductCategory(product.category) &&
                  categoryLabels[product.category]}
              </Badge>
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
              <>
                {/* 할인이 없을 때: 깔끔하게 본 가격만 표시 */}
                <div className="text-primary text-lg font-bold">
                  {product.price.toLocaleString()}원
                  <input type="hidden" defaultValue={product.price} />
                </div>
              </>
            )}
          </div>

          {/* Options */}
          <ProductOptions
            options={options}
            discountedPrice={discountedPrice}
            setSelectedOptionIds={setSelectedOptionIds}
            selectedOptionIds={selectedOptionIds}
          />

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
            <Link href={`/templates/${product._id}/preview`} className="block">
              <Btn
                variant="outline"
                size="lg"
                className="w-full bg-transparent"
              >
                <Eye className="mr-2 h-5 w-5" />
                미리보기
              </Btn>
            </Link>

            <Btn size="lg" className="w-full" onClick={handlePurchase}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              구매하기
            </Btn>

            <ProductLikeButton
              productLikes={product.likes}
              productId={product._id}
            />
            <Btn variant="outline" size="lg" className="flex-1 bg-transparent">
              <Share2 className="mr-2 h-4 w-4" />
              공유하기
            </Btn>
          </div>

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
