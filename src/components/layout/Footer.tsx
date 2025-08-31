"use client";
import React, { useEffect, useRef } from "react";
import BlurWord from "../molecules/typography/BlurWord";

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div
      className="relative z-50 h-screen w-full bg-black text-white"
      ref={containerRef}
    >
      <div className="flex h-[25vh] items-center justify-center">
        <BlurWord word="contact" />
      </div>
    </div>
  );
};

export default Footer;
