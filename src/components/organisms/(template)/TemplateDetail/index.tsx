"use client";

import Link from "next/link";
import { Eye, ShoppingCart, Heart, Share2, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Btn } from "@/components/atoms/Btn/Btn";
import { Product } from "@/services/product.service";
import Thumbnail from "@/components/atoms/Thumbnail";
import { useIsMobile } from "@/hooks/use-mobile";
import { categoryLabels, isProductCategory } from "@/utils/category";
import { salePercent } from "@/contants/product";
import { Input } from "@/components/atoms/Input/Input";
import { formatPriceWithComma } from "@/utils/price";
import { PremiumFeature } from "@/services/premiumFeature.service";
import StatusSelect from "@/components/molecules/StatusSelect";
import ProductLikeButton from "@/components/molecules/(button)/ProductLikeButton";

export function TemplateDetail({
  product,
  options,
}: {
  product: Product;
  options: PremiumFeature[];
}) {
  // const [isLiked, setIsLiked] = useState(false);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const isMobile = useIsMobile();
  console.log({ product });
  const _options = useMemo(() => {
    return options.map((option) => ({
      label: `${option.label} (+${formatPriceWithComma(
        option.additionalPrice,
      )}원)`,
      value: option._id.toString(),
    }));
  }, [options]);

  const handleSelectOption = useCallback(
    (value: string) => {
      if (selectedOptionIds.includes(value)) {
        alert("이미 선택한 옵션입니다.");
        return;
      }
      setSelectedOptionIds((prev) => [...prev, value]);
    },
    [selectedOptionIds],
  );

  const handleDeselectOption = useCallback((value: string) => {
    setSelectedOptionIds((prev) => prev.filter((id) => id !== value));
  }, []);

  const totalPrice = useMemo(() => {
    const basePrice = product.price * (1 - salePercent);
    const optionsPrice = selectedOptionIds.reduce((sum, id) => {
      const selectedOpt = options.find((opt) => opt._id === id);
      return sum + (selectedOpt?.additionalPrice || 0);
    }, 0);
    return basePrice + optionsPrice;
  }, [product.price, selectedOptionIds, options]);

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
            <div className="flex items-baseline gap-2">
              <span className="text-sm">{salePercent * 100}%</span>
              <span className="text-muted-foreground/40 text-sm line-through">
                {formatPriceWithComma(product.price)}원
              </span>
            </div>
            <div className="text-destructive text-lg font-bold">
              {formatPriceWithComma(product.price * (1 - salePercent))}원{" "}
              <span className="text-sm font-normal">할인</span>
              <Input
                className="hidden"
                defaultValue={product.price * (1 - salePercent)}
              />
            </div>
          </div>

          {/* Options */}
          {options.length > 0 && (
            <div className="col-span-2 w-full space-y-4">
              <StatusSelect
                value=""
                onValueChange={handleSelectOption}
                disabled={selectedOptionIds.length === options.length}
                items={_options}
                placeholder="프리미엄 옵션 선택"
              />
              {selectedOptionIds.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedOptionIds.map((id) => {
                    const option = _options.find((opt) => opt.value === id);
                    if (!option) return null;
                    return (
                      <Badge
                        key={id}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {option.label}
                        <button
                          onClick={() => handleDeselectOption(id)}
                          className="hover:bg-background/20 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Total Price */}
          <div className="border-border flex items-center justify-between border-y py-4">
            <span className="text-md font-medium">총 상품 금액</span>
            <span className="text-destructive text-xl font-bold">
              {formatPriceWithComma(totalPrice)}원
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
            {/* 버튼1 */}
            <div>
              <Link
                href={`/templates/${product._id}/preview`}
                className="block"
              >
                <Btn
                  variant="outline"
                  size="lg"
                  className="w-full bg-transparent"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  미리보기
                </Btn>
              </Link>
            </div>

            {/* 버튼2 */}
            <div>
              <Link
                href={`/checkout?templateId=${product._id}`}
                className="block"
              >
                <Btn size="lg" className="w-full">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  구매하기
                </Btn>
              </Link>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="flex gap-2">
            <ProductLikeButton
              productLikes={product.likes}
              productId={product._id}
            />
            <Btn variant="outline" size="sm" className="flex-1 bg-transparent">
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
