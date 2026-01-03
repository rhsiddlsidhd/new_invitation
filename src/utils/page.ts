import { PagePath, PAGE_TITLE } from "@/contants/page";

export const isPageTitle = (value: string): value is PagePath => {
  return Object.keys(PAGE_TITLE).includes(value);
};
