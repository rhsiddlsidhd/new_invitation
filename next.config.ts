module.exports = () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig: import("next").NextConfig = {
    // async rewrites() {
    //   return [
    //     {
    //       source: "/subway/:q",

    //       destination: `${process.env.SUBWAY_SEOUL_BASE_URL}/${process.env.SEOUL_PUBLIC_API_KEY}/json/SearchInfoBySubwayNameService/1/5/:q/`,
    //     },
    //     {
    //       source: "/subway",
    //       destination: `${process.env.SUBWAY_SEOUL_BASE_URL}/${process.env.SEOUL_PUBLIC_API_KEY}/json/SearchInfoBySubwayNameService/1/1000/`,
    //     },
    //   ];
    // },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          pathname: "/**",
        },
      ],
    },
  };

  return nextConfig;
};
