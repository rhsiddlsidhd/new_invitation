import { CTA } from "@/components/organisms/CTA";
import { Footer } from "@/components/layout/Footer";
import { EcommerceHero } from "@/components/organisms/EcommerceHero";
import { FeaturedProducts } from "@/components/organisms/FeaturedProducts";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col">
      <EcommerceHero />
      <FeaturedProducts />
      <CTA />
      <Footer />
    </div>
  );
};

export default page;
