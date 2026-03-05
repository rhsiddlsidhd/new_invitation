export type Mood =
  | "classic"
  | "modern"
  | "minimal"
  | "romantic"
  | "vintage";

export const moodLabels: Record<Mood, string> = {
  classic: "클래식",
  modern: "모던",
  minimal: "미니멀",
  romantic: "로맨틱",
  vintage: "빈티지",
};

export type ProductCategory = "wedding" | "thank-you" | "first-birthday";

export const productCategoryLabels: Record<ProductCategory, string> = {
  wedding: "모바일 청첩장",
  "thank-you": "감사장",
  "first-birthday": "돌잔치",
};

const moodBaseOptions = Object.entries(moodLabels).map(
  ([value, label]) => ({ value: value as Mood, label }),
);

export const isProductMood = (value: string): value is Mood => {
  return Object.keys(moodLabels).includes(value);
};

export const isProductCategory = (value: string): value is ProductCategory => {
  return Object.keys(productCategoryLabels).includes(value);
};

export const getMoodOptions = (includeAll = false) => {
  const allOption = includeAll
    ? [{ value: "all" as const, label: "전체" }]
    : [];
  return [...allOption, ...moodBaseOptions];
};

export const getCategoryOptions = () => {
  return Object.entries(productCategoryLabels).map(([value, label]) => ({
    value: value as ProductCategory,
    label,
  }));
};
