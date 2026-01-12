import { Category } from "@/utils/category";

type TemplatePrice = "ALL" | "FREE" | "UNDER-10k" | "10k-30k" | "OVER-30k";

export type TemplateFilterState = {
  keyword: string;
  category: Category | "all";
  isOpen: boolean;
  sortBy:
    | "ALL"
    | "POPULAR"
    | "RECOMENDED"
    | "LATEST"
    | "PRICE_LOW"
    | "PRICE_HIGH";
  price: TemplatePrice;
  premiumFeat: string[];
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
