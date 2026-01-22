"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";

import { Badge } from "@/components/atoms/Badge/Badge";
import { Btn } from "@/components/atoms/Btn/Btn";
import StatusSelect from "@/components/molecules/StatusSelect";
import { useOrderStore } from "@/store/order.store";
import { Product } from "@/services/product.service";
import { PremiumFeature } from "@/services/premiumFeature.service";
import { CheckoutProductData } from "@/types/checkout";
import { SelectFeatureDto } from "@/schemas/order.schema";
import { calculatePrice, formatPriceWithComma } from "@/utils/price";

const ProductOptions = ({
  product,
  options,
}: {
  product: Product;
  options: PremiumFeature[];
}) => {
  const router = useRouter();
  const setOrder = useOrderStore((state) => state.setOrder);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);

  const optionsMap = useMemo(() => {
    const map = new Map<string, PremiumFeature>();
    options.forEach((option) => map.set(option._id.toString(), option));
    return map;
  }, [options]);

  const discountedPrice = useMemo(() => {
    return calculatePrice(product.price, product.discount);
  }, [product.price, product.discount]);

  const handleSelectOption = useCallback(
    (value: string) => {
      if (selectedOptionIds.includes(value)) {
        alert("이미 선택한 옵션입니다.");
        return;
      }
      setSelectedOptionIds((prev) => [...prev, value]);
    },
    [selectedOptionIds], // selectedOptionIds가 변경될 때마다 함수 재생성
  );

  const _options = useMemo(() => {
    return options.map((option) => ({
      label: `${option.label} (+${formatPriceWithComma(
        option.additionalPrice,
      )}원)`,
      value: option._id.toString(),
      originalFeature: option,
    }));
  }, [options]);

  const handleDeselectOption = useCallback((value: string) => {
    setSelectedOptionIds((prev) => prev.filter((id) => id !== value));
  }, []); // setSelectedOptionIds는 stable하므로 의존성 배열에 넣지 않아도 됨

  const { selectedOptionsDetails, totalPrice } = useMemo(() => {
    let currentSelectedOptionPrice = 0;
    const currentSelectedOptionsDetails: SelectFeatureDto[] = [];

    selectedOptionIds.forEach((id) => {
      const selectedOpt = optionsMap.get(id);
      if (selectedOpt) {
        currentSelectedOptionsDetails.push({
          featureId: selectedOpt._id.toString(),
          code: selectedOpt.code,
          label: selectedOpt.label,
          price: selectedOpt.additionalPrice,
        });
        currentSelectedOptionPrice += selectedOpt.additionalPrice;
      } else {
        // 이 에러는 optionsMap에 없는 ID가 selectedOptionIds에 포함된 경우 발생
        // 실제 운영 환경에서는 발생하지 않도록 UI에서 선택 가능한 옵션만 ID에 추가해야 함
        console.warn(`Selected option with ID ${id} not found in optionsMap.`);
      }
    });

    const currentTotalPrice = discountedPrice + currentSelectedOptionPrice;

    return {
      selectedOptionsDetails: currentSelectedOptionsDetails,
      selectedOptionPrice: currentSelectedOptionPrice,
      totalPrice: currentTotalPrice,
    };
  }, [selectedOptionIds, optionsMap, discountedPrice]);

  const handlePurchase = useCallback(() => {
    const quantity = 1;

    const checkoutData: CheckoutProductData = {
      _id: product._id.toString(),
      title: product.title,
      originalPrice: product.price,
      discountedPrice,
      discount: { type: product.discount.type, value: product.discount.value },
      thumbnail: product.thumbnail,
      selectedFeatures: selectedOptionsDetails,
      quantity: quantity,
      productTotalPrice: totalPrice * quantity,
    };

    try {
      setOrder(checkoutData);
      router.push("/couple-info");
    } catch (error) {
      console.error("Failed to save to order store:", error);
      alert("상품 정보를 저장하는 데 실패했습니다. 다시 시도해 주세요.");
    }
  }, [
    product,
    discountedPrice,
    selectedOptionsDetails,
    totalPrice,
    router,
    setOrder,
  ]);

  return (
    <div>
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
                const option = optionsMap.get(id); // optionsMap 사용
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
      <div className="flex items-center justify-between py-4">
        <span className="text-md font-medium">총 상품 금액</span>
        <span className="text-destructive text-xl font-bold">
          {formatPriceWithComma(totalPrice)}원
        </span>
      </div>
      <div>
        <Btn size="lg" className="w-full" onClick={handlePurchase}>
          <ShoppingCart className="mr-2 h-5 w-5" />
          구매하기
        </Btn>
      </div>
    </div>
  );
};

export default ProductOptions;
