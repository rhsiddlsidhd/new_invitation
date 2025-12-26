import { CategoryEnum } from "@/models/product.model";

export const categoryLabels: Record<CategoryEnum, string> = {
  classic: "클래식",
  modern: "모던",
  minimal: "미니멀",
  romantic: "로맨틱",
  vintage: "빈티지",
};

const categoryBaseOptions = Object.entries(categoryLabels).map(
  ([value, label]) => ({ value: value as CategoryEnum, label }),
);

export const getCategoryOptions = (includeAll = false) => {
  const allOption = includeAll
    ? [{ value: "all" as const, label: "전체" }]
    : [];
  return [...allOption, ...categoryBaseOptions];
};
