type TemplatePrice = "ALL" | "FREE" | "UNDER-10k" | "10k-30k" | "OVER-30k";

type TemplateFeature =
  | "VIDEO"
  | "HORIZONTAL_SLIDE"
  | "CUSTOM_FONT"
  | "SAVE_MOBILE_INVITATION"
  | "SAVE_GUESTBOOK";

export type TemplateFilterState = {
  keyword: string;
  category: "전체" | "모던" | "클래식" | "미니멀" | "로맨틱" | "빈티지";
  isOpen: boolean;
  sortBy:
    | "ALL"
    | "POPULAR"
    | "RECOMENDED"
    | "LATEST"
    | "PRICE-LOW"
    | "PRICE_HIGH";
  price: TemplatePrice;
  premiumFeat: TemplateFeature[];
};

export type TemplateFilterAction =
  | { type: "CHANGE_KEYWORD"; payload: string }
  | { type: "SELECT_CATEGORY"; payload: TemplateFilterState["category"] }
  | { type: "OPEN_SUGGESTIONS" }
  | { type: "CLOSE_SUGGESTIONS" }
  | { type: "SELECT_SORT_BY"; payload: TemplateFilterState["sortBy"] }
  | { type: "SELECT_PRICE"; payload: TemplateFilterState["price"] }
  | {
      type: "SELECT_PREMIUM_FEAT";
      payload: TemplateFilterState["premiumFeat"][number];
    }
  | { type: "CLEAR_DETAIL_FILTER"; payload: null };
