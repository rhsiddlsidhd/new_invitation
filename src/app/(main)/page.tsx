import { CTA } from "@/components/organisms/CTA";
import { Footer } from "@/components/layout/Footer";
import { EcommerceHero } from "@/components/organisms/EcommerceHero";
import { CategoryNav } from "@/components/organisms/CategoryNav";
import { FeaturedProducts } from "@/components/organisms/FeaturedProducts";
import { LatestProducts } from "@/components/organisms/Templates";

import React from "react";

const page = () => {
  return (
    <div className="flex flex-col">
      <EcommerceHero />
      <CategoryNav />
      <FeaturedProducts />
      <LatestProducts />
      <CTA />
      <Footer />
    </div>
  );
};

export default page;
