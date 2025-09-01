import { GalleryData } from "@/types";

export const defaultUrls = "/marriage.jpg";

export const squareSizes = [
  "w-16 h-16", // 64px
  "w-20 h-20", // 80px
  "w-24 h-24", // 96px
  "w-28 h-28", // 112px
  "w-32 h-32", // 128px
  "w-36 h-36", // 144px
  "w-10 h-10", // 40px
  "w-14 h-14", // 56px
  "w-18 h-18", // 72px
  "w-22 h-22", // 88px
  "w-26 h-26", // 104px
  "w-30 h-30", // 120px
  "w-34 h-34", // 136px
  "w-40 h-40", // 160px
] as const;

export const introMessage = "Wedding Invitations!" as const;

export const menus = [
  { id: "My Info", path: "/profile" },
  { id: "Create Invitation", path: "/dashboard" },
  { id: "Shop", path: "/shop" },
] as const;

export const cardConfig: Record<
  GalleryData["type"],
  {
    length: number;
    gridClass: string;
    getCellClass: (i: number) => string;
  }
> = {
  A: {
    length: 2,
    gridClass: "grid-rows-2",
    getCellClass: () => "",
  },
  B: {
    length: 3,
    gridClass: "grid-cols-2 grid-rows-4",
    getCellClass: (i: number) =>
      (i + 1) % 3 === 0 ? "col-span-2 row-span-2" : "row-span-2",
  },
  C: {
    length: 4,
    gridClass: "grid-cols-2",
    getCellClass: () => "",
  },
  D: {
    length: 5,
    gridClass: "grid-cols-2 grid-rows-6",
    getCellClass: (i: number) =>
      (i + 1) % 2 === 0 ? "row-span-3" : "row-span-2",
  },
  E: {
    length: 6,
    gridClass: "grid-cols-2 grid-rows-3",
    getCellClass: () => "",
  },
};
