"use client";
import { Badge } from "@/components/atoms/Badge/Badge";
import StatusSelect from "@/components/molecules/StatusSelect";
import { PremiumFeature } from "@/services/premiumFeature.service";
import { SelectedOption } from "@/types/checkout";
import { formatPriceWithComma } from "@/utils/price";
import { X } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

const ProductOptions = ({
  options,
  discountedPrice,
  setSelectedOptionIds,
  selectedOptionIds,
}: {
  options: PremiumFeature[];
  discountedPrice: number;
  setSelectedOptionIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedOptionIds: string[];
}) => {
  //   const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);

  const handleSelectOption = useCallback(
    (value: string) => {
      if (selectedOptionIds.includes(value)) {
        alert("이미 선택한 옵션입니다.");
        return;
      }
      setSelectedOptionIds((prev) => [...prev, value]);
    },
    [selectedOptionIds, setSelectedOptionIds],
  );

  const _options = useMemo(() => {
    return options.map((option) => ({
      label: `${option.label} (+${formatPriceWithComma(
        option.additionalPrice,
      )}원)`,
      value: option._id.toString(),
      originalFeature: option, // Store original feature for price, code, label
    }));
  }, [options]);

  const handleDeselectOption = useCallback(
    (value: string) => {
      setSelectedOptionIds((prev) => prev.filter((id) => id !== value));
    },
    [setSelectedOptionIds],
  );

  const selectedOptionsDetails: SelectedOption[] = useMemo(() => {
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

  const selectedOptionPrice = useMemo(() => {
    return selectedOptionsDetails.reduce((sum, opt) => sum + opt.price, 0);
  }, [selectedOptionsDetails]);

  const totalPrice = useMemo(() => {
    return discountedPrice + selectedOptionPrice;
  }, [discountedPrice, selectedOptionPrice]);

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
      <div className="flex items-center justify-between py-4">
        <span className="text-md font-medium">총 상품 금액</span>
        <span className="text-destructive text-xl font-bold">
          {formatPriceWithComma(totalPrice)}원
        </span>
      </div>
    </div>
  );
};

export default ProductOptions;
