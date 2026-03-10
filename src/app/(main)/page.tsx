import { CTA } from "@/components/organisms/CTA";
import { Footer } from "@/components/layout/Footer";
import { EcommerceHero } from "@/components/organisms/EcommerceHero";
import { FeaturedProducts } from "@/components/organisms/FeaturedProducts";
import { PreviewSection } from "@/components/organisms/PreviewSection";
import { getProductService } from "@/services/product.service";
import React from "react";

const page = async () => {
  const previewProductId = "69afb24d31ac12bafa1a302c";
  const infoId = "69afb3a631ac12bafa1a303c";
  const product = await getProductService(previewProductId);

  return (
    <div className="flex flex-col">
      <EcommerceHero />
      <FeaturedProducts />
      {product && <PreviewSection product={product} infoId={infoId} />}
      <CTA />
      <Footer />
    </div>
  );
};

export default page;
