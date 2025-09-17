import { MetadataRoute } from "next";

const BASEURL =
  process.env.NODE_ENV === "development"
    ? process.env.BASE_URL
    : process.env.DEPLOYMENT_BASE_URL;

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: `${BASEURL}`,
      lastModified: new Date(),
    },
    {
      url: `${BASEURL}/detail/${process.env.NEXT_PUBLIC_SAMPLE_USERID}`,
      lastModified: new Date(),
    },
  ];
};

export default sitemap;
