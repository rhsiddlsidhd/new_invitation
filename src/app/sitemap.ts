import { PRODUCT_LIST } from "@/constant";
import { MetadataRoute } from "next";

const BASEURL =
  process.env.NODE_ENV === "development"
    ? process.env.BASE_URL
    : process.env.DEPLOYMENT_BASE_URL;

const sitemap = (): MetadataRoute.Sitemap => {
  const products = PRODUCT_LIST.map((item) => item.id);

  return [
    {
      url: `${BASEURL}`,
      lastModified: new Date(),
    },
    ...products.map((id) => ({
      url: `${BASEURL}/products/mobile-invitation/${id}`,
      lastModified: new Date(),
    })),
    ...products.map((id) => ({
      url: `${BASEURL}/preview/mobile-invitation/${id}`,
      lastModified: new Date(),
    })),
  ];
};

export default sitemap;
