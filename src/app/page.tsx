import Home from "@/components/template/Home";
import { Metadata } from "next";
import React from "react";

// ...existing code...
export const metadata: Metadata = {
  title: "Home - New Invitation",
  description: "모바일 청첩장을 쉽고 빠르게 만들어드립니다.",
  keywords: ["청첩장", "웨딩", "invitation", "mobile", "wedding invitation"],
  authors: [
    { name: "New Invitation", url: "https://new-invitation-pi.vercel.app" },
  ],
  creator: "New Invitation",
  publisher: "New Invitation",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  openGraph: {
    title: "New Invitation",
    description: "모바일 청첩장을 쉽고 빠르게 만들어드립니다.",
    images: ["/wedding-1850.jpg"],
    siteName: "New Invitation",
    type: "website",
    url: "https://new-invitation-pi.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Invitation",
    description: "모바일 청첩장을 쉽고 빠르게 만들어드립니다.",
    images: ["/wedding-1850.jpg"],
    creator: "@your_twitter_handle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
    },
  },
};

const page = () => {
  return <Home />;
};

export default page;
