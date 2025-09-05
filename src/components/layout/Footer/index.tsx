import BlurWord from "@/components/molecules/typography/BlurWord";
import React from "react";

const Footer = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="relative z-50 bg-black text-white"
    >
      <div className="flex h-[25vh] items-center justify-center">
        <BlurWord word="contact" />
      </div>
    </div>
  );
};

export default Footer;
