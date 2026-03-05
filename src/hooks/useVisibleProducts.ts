import { useMemo } from "react";

import { Product } from "@/services/product.service";
import { ProductFilterState } from "@/context/productFilter/type";
import { getChosung } from "@/utils/hangul";

const useVisibleProducts = ({
  state,
  mood,
  data,
}: {
  state: ProductFilterState;
  mood: string;
  data: Product[];
}) => {
  const keywordChosung = useMemo(
    () => getChosung(state.keyword),
    [state.keyword],
  );

  const visibleProducts = useMemo(() => {
    // 1. Filter
    const filtered = data.filter((item) => {
      // Mood (Style) filter
      const moodMatch = mood === "all" || item.mood === mood;

      // Keyword filter
      const keywordMatch = (() => {
        if (!state.keyword) return true;
        const nameChosung = getChosung(item.title);
        return (
          item.title.includes(state.keyword) ||
          nameChosung.includes(keywordChosung)
        );
      })();

      // Price filter
      const priceMatch = (() => {
        switch (state.price) {
          case "ALL":
            return true;
          case "FREE":
            return item.price === 0;
          case "UNDER-10k":
            return item.price > 0 && item.price < 10000;
          case "10k-30k":
            return item.price >= 10000 && item.price <= 30000;
          case "OVER-30k":
            return item.price > 30000;
          default:
            return true;
        }
      })();

      // Premium Feature filter
      const premiumFeatMatch = (() => {
        if (state.premiumFeat.length === 0) {
          return true;
        }
        return (
          item.isPremium &&
          item.options &&
          state.premiumFeat.every((featId) => item.options.includes(featId))
        );
      })();

      return moodMatch && keywordMatch && priceMatch && premiumFeatMatch;
    });

    // 2. Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (state.sortBy) {
        case "POPULAR":
          return b.likes.length - a.likes.length;
        case "RECOMENDED":
          if (a.feature !== b.feature) {
            return b.feature ? 1 : -1;
          }
          return b.priority - a.priority;
        case "PRICE_LOW":
          return a.price - b.price;
        case "PRICE_HIGH":
          return b.price - a.price;
        case "LATEST":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "ALL":
        default:
          return 0;
      }
    });

    return sorted;
  }, [
    mood,
    state.keyword,
    state.price,
    state.premiumFeat,
    state.sortBy,
    keywordChosung,
    data,
  ]);

  return { visibleProducts };
};

export default useVisibleProducts;
