import { useMemo } from "react";
import { getChosung, isChosungOnly } from "@/shared/utils/string/hangul";
import { templates } from "@/domains/template/data";

const useSugessteTemplate = (keyword: string) => {
  const keywordChosung = useMemo(() => getChosung(keyword), [keyword]);
  const isChosung = isChosungOnly(keyword);

  const suggestions = useMemo(() => {
    if (!keyword) return [];

    return templates
      .filter((item) => {
        if (item.name.includes(keyword)) return true;

        if (isChosung) {
          const nameChosung = getChosung(item.name);
          return nameChosung.includes(keywordChosung);
        }

        return false;
      })
      .slice(0, 5)
      .map((t) => t.name);
  }, [keyword, keywordChosung, isChosung]);
  return { suggestions };
};

export default useSugessteTemplate;
