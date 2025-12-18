import React, { useMemo } from "react";
import { useTemplateFilter } from "../context";
import { getChosung } from "@/shared/utils/string/hangul";
import { templates } from "@/domains/template/data";

const useVisibleTemplate = ({
  keyword,
  category,
}: {
  keyword: string;
  category: string;
}) => {
  //   const keyword = state.keyword.trim();
  const keywordChosung = useMemo(() => getChosung(keyword), [keyword]);

  const visibleTemplates = useMemo(() => {
    return templates.filter((item) => {
      const categoryMatch = category === "전체" || item.category === category;

      if (!keyword) return categoryMatch;

      const nameChosung = getChosung(item.name);
      const keywordMatch =
        item.name.includes(keyword) || nameChosung.includes(keywordChosung);

      return categoryMatch && keywordMatch;
    });
  }, [category, keyword, keywordChosung]);

  return { visibleTemplates };
};

export default useVisibleTemplate;
