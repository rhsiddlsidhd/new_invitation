import { GalleryData, Product } from "@/shared/types";

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
  { id: "Profile", path: "/profile" },
  { id: "Dashboard", path: "/dashboard" },
  { id: "Products", path: "/products" },
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

export const recommendedText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illo reiciendis! Quod similique alias ab ex commodi sed nemo quianesciunt natus. Beatae commodi amet magnam praesentium libero rerumimpedit!" as const;

export const PRODUCT_LIST: Product[] = [
  {
    id: "akwmrlawz",
    title: "라이트 그레이",
    description: "맑고 차분한 분위기를 전해주는 은은한 컬러",
    thumbnail: "love-1920",
    price: 0,
    category: "mobile-invitation",
    options: {
      font: ["Arial", "Helvetica"],
    },
  },
  {
    id: "bqjznwpoi",
    title: "소프트 베이지",
    description: "따뜻하면서도 자연스러운 무드의 컬러",
    thumbnail: "love-1",
    price: 1000,
    category: "mobile-invitation",
    options: {
      font: ["Roboto", "Noto Sans"],
    },
  },
  {
    id: "cydhfksle",
    title: "클린 화이트",
    description: "깔끔하고 미니멀한 감성을 담은 컬러",
    thumbnail: "love-2",
    price: 2000,
    category: "mobile-invitation",
    options: {
      font: ["Times New Roman", "Georgia"],
    },
  },
  {
    id: "dmxpwqkru",
    title: "소프트 아이보리",
    description: "은은하게 따스함을 더해주는 차분한 컬러",
    thumbnail: "love-3",
    price: 3000,
    category: "mobile-invitation",
    options: {
      font: ["Nanum Gothic", "Spoqa Han Sans"],
    },
  },
  {
    id: "eqzlxvtyn",
    title: "웜 크림",
    description: "부드럽고 포근한 분위기를 살려주는 컬러",
    thumbnail: "love-4",
    price: 5000,
    category: "mobile-invitation",
    options: {
      font: ["Pretendard", "Inter"],
    },
  },
];
