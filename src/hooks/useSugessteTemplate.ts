import { useMemo } from "react";

import { Product } from "@/services/product.service";
import { getChosung, isChosungOnly } from "@/utils/hangul";

const useSugessteTemplate = ({
  data,
  keyword,
}: {
  data: Product[];
  keyword: string;
}) => {
  const keywordChosung = useMemo(() => getChosung(keyword), [keyword]);
  const isChosung = isChosungOnly(keyword);

  const suggestions = useMemo(() => {
    if (!keyword) return [];

    return data
      .filter((item) => {
        if (item.title.includes(keyword)) return true;

        if (isChosung) {
          const nameChosung = getChosung(item.title);
          return nameChosung.includes(keywordChosung);
        }

        return false;
      })
      .slice(0, 5)
      .map((t) => t.title);
  }, [keyword, keywordChosung, isChosung, data]);
  return { suggestions };
};

export default useSugessteTemplate;
