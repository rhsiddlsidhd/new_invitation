export type TemplateFilterState = {
  keyword: string;
  category: "전체" | "모던" | "클래식" | "미니멀" | "로맨틱" | "빈티지";
  isOpen: boolean;
};

export type TemplateFilterAction =
  | { type: "CHANGE_KEYWORD"; payload: string }
  | { type: "SELECT_CATEGORY"; payload: TemplateFilterState["category"] }
  | { type: "OPEN_SUGGESTIONS" }
  | { type: "CLOSE_SUGGESTIONS" };
