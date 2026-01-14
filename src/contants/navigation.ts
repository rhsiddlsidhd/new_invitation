import openApp from "@/utils/openApp";

export const navigationButtons = [
  {
    name: "네이버지도",
    path: "navermap.webp",
    onClick: ({ current, target, address }) =>
      current &&
      target &&
      address &&
      openApp.openNaverMap({ current, target, address }),
  },
  {
    name: "티맵",
    path: "tmap.webp",
    onClick: ({ address }) => address && openApp.openTmap(address),
  },
  {
    name: "카카오내비",
    path: "kakaonavi.webp",
    onClick: ({ current, target, address }) =>
      current &&
      target &&
      address &&
      openApp.openKakaoMap({ current, target, address }),
  },
] as const;
