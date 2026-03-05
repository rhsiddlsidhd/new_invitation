import { CTA } from "@/components/organisms/(landing)/CTA";
import { Footer } from "@/components/layout/Footer";
import { EcommerceHero } from "@/components/organisms/(landing)/EcommerceHero";
import { CategoryNav } from "@/components/organisms/(landing)/CategoryNav";
import { FeaturedProducts } from "@/components/organisms/(landing)/FeaturedProducts";
import { LatestProducts } from "@/components/organisms/(landing)/Templates";

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
