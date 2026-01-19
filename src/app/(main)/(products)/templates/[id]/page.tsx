import { TemplateFeatures } from "@/components/organisms/(template)/TemplateFeatures";
import { TemplateSummary } from "@/components/organisms/(template)/TemplateSummary";
import { getPremiumFeatureService } from "@/services/premiumFeature.service";
import { getProductService } from "@/services/product.service";
import React from "react";

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductService(id);
  console.log({ product });

  if (!product) throw new Error("Product not found");
  const options = await getPremiumFeatureService(product.options);

  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mx-auto max-w-6xl">
          <TemplateSummary product={product} options={options} />

          <TemplateFeatures options={options} />
        </div>
      </div>
    </main>
  );
}
