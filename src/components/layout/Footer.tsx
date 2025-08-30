import React from "react";
import BlurWord from "../molecules/typography/BlurWord";

const Footer = () => {
  return (
    <div className="sticky top-0 z-50 h-screen w-full bg-black text-white">
      <div className="flex h-[25vh] items-center justify-center">
        <BlurWord word="contact" />
      </div>
    </div>
  );
};

export default Footer;
