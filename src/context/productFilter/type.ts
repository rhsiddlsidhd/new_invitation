import { Mood } from "@/utils/category";

type ProductPrice = "ALL" | "FREE" | "UNDER-10k" | "10k-30k" | "OVER-30k";

export type ProductFilterState = {
  keyword: string;
  mood: Mood | "all";
  isOpen: boolean;
  sortBy:
    | "ALL"
    | "POPULAR"
    | "RECOMENDED"
    | "LATEST"
    | "PRICE_LOW"
    | "PRICE_HIGH";
  price: ProductPrice;
  premiumFeat: string[];
};

export type ProductFilterAction =
  | { type: "CHANGE_KEYWORD"; payload: string }
  | { type: "SELECT_MOOD"; payload: ProductFilterState["mood"] }
  | { type: "OPEN_SUGGESTIONS" }
  | { type: "CLOSE_SUGGESTIONS" }
  | { type: "SELECT_SORT_BY"; payload: ProductFilterState["sortBy"] }
  | { type: "SELECT_PRICE"; payload: ProductFilterState["price"] }
  | {
      type: "SELECT_PREMIUM_FEAT";
      payload: ProductFilterState["premiumFeat"][number];
    }
  | { type: "CLEAR_DETAIL_FILTER"; payload: null };
