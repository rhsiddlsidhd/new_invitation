"use client";
import React from "react";
import BlurWord from "../molecules/typography/BlurWord";

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
