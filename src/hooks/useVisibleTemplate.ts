import { useMemo } from "react";

import { getChosung } from "@/shared/utils/string/hangul";
import { Product } from "@/services/product.service";

const useVisibleTemplate = ({
  keyword,
  category,
  data,
}: {
  keyword: string;
  category: string;
  data: Product[];
}) => {
  const keywordChosung = useMemo(() => getChosung(keyword), [keyword]);

  const visibleTemplates = useMemo(() => {
    // console.log({data})
    return data.filter((item) => {
      const categoryMatch = category === "all" || item.category === category;

      if (!keyword) return categoryMatch;

      const nameChosung = getChosung(item.title);
      const keywordMatch =
        item.title.includes(keyword) || nameChosung.includes(keywordChosung);

      return categoryMatch && keywordMatch;
    });
  }, [category, keyword, keywordChosung, data]);

  return { visibleTemplates };
};

export default useVisibleTemplate;
