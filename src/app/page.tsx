import { CTA } from "@/components/organisms/(landing)/CTA";
import Features from "@/components/organisms/(landing)/Features";
import { Footer } from "@/components/layout/Footer";
import Hero from "@/components/organisms/(landing)/Hero";
import { Pricing } from "@/components/organisms/(landing)/Pricing";
import { Templates } from "@/components/organisms/(landing)/Templates";

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
