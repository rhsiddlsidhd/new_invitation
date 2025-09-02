// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
// images: {
//   remotePatterns: [
//     {
//       protocol: "https",
//       hostname: "res.cloudinary.com",
//       pathname: "/**",
//     },
//   ],
//   },

// };

// export default nextConfig;

module.exports = () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig: import("next").NextConfig = {
    async rewrites() {
      return [
        {
          source: "/subway/:q",

          destination: `${process.env.SUBWAY_SEOUL_BASE_URL}/${process.env.NEXT_PUBLIC_SEOUL_PUBLIC_API_KEY}/json/SearchInfoBySubwayNameService/1/1000/:q`,
        },
        {
          source: "/subway",
          destination: `${process.env.SUBWAY_SEOUL_BASE_URL}/${process.env.NEXT_PUBLIC_SEOUL_PUBLIC_API_KEY}/json/SearchInfoBySubwayNameService/1/1000/`,
        },
      ];
    },
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
