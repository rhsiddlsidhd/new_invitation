import { CTA } from "@/components/template/CTA";
import Features from "@/components/template/Features";
import { Footer } from "@/components/template/Footer";
import Hero from "@/components/template/Hero";
import { Pricing } from "@/components/template/Pricing";
import { Templates } from "@/components/template/Template";

import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Templates />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
};

export default page;
