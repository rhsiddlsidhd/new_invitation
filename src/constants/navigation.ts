import openApp from "@/utils/openApp";

export const navigationButtons = [
  {
    name: "네이버지도",
    path: "navermap.webp",
    onClick: ({
      current,
      target,
      address,
    }: {
      current: { lng: number | null; lat: number | null };
      target: { lng: number | null; lat: number | null };
      address: string;
    }) =>
      current &&
      target &&
      address &&
      openApp.openNaverMap({ current, target, address }),
  },
  {
    name: "티맵",
    path: "tmap.webp",
    onClick: ({ address }: { address: string }) =>
      address && openApp.openTmap(address),
  },
  {
    name: "카카오내비",
    path: "kakaonavi.webp",
    onClick: ({
      current,
      target,
      address,
    }: {
      current: { lng: number | null; lat: number | null };
      target: { lng: number | null; lat: number | null };
      address: string;
    }) =>
      current &&
      target &&
      address &&
      openApp.openKakaoMap({ current, target, address }),
  },
] as const;

export const mainNavItems = [
  {
    id: "invitation",
    label: "모바일 청첩장",
    href: "/products?category=invitation",
  },
  {
    id: "business-card",
    label: "명함",
    href: "/products?category=business-card",
  },
  {
    id: "reviews",
    label: "고객후기",
    href: "/reviews",
  },
] as const;
