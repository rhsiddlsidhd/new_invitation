"use client";

import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

import AutoCompleteList from "@/components/molecules/(search)/AutoCompleteList";

import { Command, CommandInput } from "@/components/atoms/command";
import { Button } from "@/components/atoms/button";
import useSuggestProducts from "@/hooks/useSuggestProducts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { Badge } from "@/components/atoms/badge";
import { useState } from "react";

import { useProductFilter } from "@/context/productFilter/reducer";
import { ProductFilterState } from "@/context/productFilter/type";
import { Product } from "@/services/product.service";
import { getMoodOptions } from "@/utils/category";
import usePremiumFeature from "@/hooks/usePremiumFeatures";

const premiumFeatLabel: Record<string, string> = {
  VIDEO: "🎬 비디오 추가",
  HORIZONTAL_SLIDE: "➡️ 가로 슬라이드 갤러리",
  CUSTOM_FONT: "✍️ 나만의 폰트",
  SAVE_MOBILE_INVITATION: "💌 영원히 간직하는 청첩장",
  SAVE_GUESTBOOK: "📝 방명록 추억 저장",
};

export function ProductFilters({ data }: { data: Product[] }) {
  const [state, dispatch] = useProductFilter();
  const { premiumFeatures } = usePremiumFeature();
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const { suggestions } = useSuggestProducts({
    data,
    keyword: state.keyword.trim(),
  });

  const prices: ProductFilterState["price"][] = [
    "ALL",
    "FREE",
    "UNDER-10k",
    "10k-30k",
    "OVER-30k",
  ];

  const priceLabels: Record<ProductFilterState["price"], string> = {
    ALL: "모두",
    FREE: "무료",
    "UNDER-10k": "1만원 이하",
    "10k-30k": "1만원 이상 3만원 이하",
    "OVER-30k": "3만원 이상",
  };

  const sortBy: ProductFilterState["sortBy"][] = [
    "ALL",
    "POPULAR",
    "RECOMENDED",
    "LATEST",
    "PRICE_LOW",
    "PRICE_HIGH",
  ];

  const sortBylabels: Record<ProductFilterState["sortBy"], string> = {
    ALL: "모두",
    POPULAR: "인기순",
    LATEST: "최신순",
    RECOMENDED: "추천순",
    PRICE_LOW: "낮은 가격순",
    PRICE_HIGH: "높은 가격순",
  };

  return (
    <div className="mb-8 space-y-4">
      <Command
        shouldFilter={false}
        className="relative max-w-md overflow-visible rounded-lg border shadow-md"
      >
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

        <CommandInput
          value={state.keyword}
          placeholder="상품 검색..."
          onValueChange={(value) => {
            dispatch({ type: "CHANGE_KEYWORD", payload: value });
            dispatch({ type: "OPEN_SUGGESTIONS" });
          }}
        />

        <AutoCompleteList
          suggestions={suggestions}
          isOpen={state.isOpen}
          onSelect={(name) => {
            dispatch({ type: "CHANGE_KEYWORD", payload: name });
            dispatch({ type: "CLOSE_SUGGESTIONS" });
          }}
        />
      </Command>

      <p className="mt-1 text-sm text-gray-500">
        원하는 스타일과 기준을 선택해보세요
      </p>

      <div className="flex flex-wrap gap-2">
        {getMoodOptions(true).map((option) => (
          <Button
            key={option.value}
            variant={state.mood === option.value ? "default" : "outline"}
            onClick={() =>
              dispatch({ type: "SELECT_MOOD", payload: option.value })
            }
            size="sm"
          >
            {option.label}
          </Button>
        ))}
      </div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="min-w-35 justify-between bg-transparent"
            >
              <span className="flex items-center gap-2">
                {sortBylabels[state.sortBy]}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40">
            <DropdownMenuRadioGroup
              onValueChange={(value) =>
                dispatch({
                  type: "SELECT_SORT_BY",
                  payload: value as ProductFilterState["sortBy"],
                })
              }
            >
              {sortBy.map((value) => (
                <DropdownMenuRadioItem value={value} key={value}>
                  {sortBylabels[value]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="h-full min-w-35 gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          상세 필터
        </Button>
      </div>

      {showAdvanced && (
        <div className="border-border bg-muted/30 space-y-4 rounded-lg border p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">가격대</h3>
            <div className="flex flex-wrap gap-2">
              {prices.map((value) => (
                <Badge
                  variant={state.price === value ? "default" : "outline"}
                  key={value}
                  onClick={() =>
                    dispatch({ type: "SELECT_PRICE", payload: value })
                  }
                  className="cursor-pointer"
                >
                  {priceLabels[value]}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">특별 옵션</h3>
            <div className="flex flex-wrap gap-2">
              {premiumFeatures.map((value) => (
                <Badge
                  variant={
                    state.premiumFeat.includes(value._id)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer"
                  key={value._id}
                  onClick={() =>
                    dispatch({
                      type: "SELECT_PREMIUM_FEAT",
                      payload: value._id,
                    })
                  }
                >
                  {
                    premiumFeatLabel[
                      value.code as keyof typeof premiumFeatLabel
                    ] || value.label
                  }
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              className="cursor-pointer"
              variant="outline"
              size="sm"
              onClick={() =>
                dispatch({ type: "CLEAR_DETAIL_FILTER", payload: null })
              }
            >
              필터 초기화
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
