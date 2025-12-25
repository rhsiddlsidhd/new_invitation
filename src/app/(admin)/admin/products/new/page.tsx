import { getAllPremiumFeatureService } from "@/services/premiumFeature.service";
import { Btn } from "@/components/atoms/Btn/Btn";
import { ProductRegistrationForm } from "@/components/organisms/(forms)/ProductRegistrationForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewProductPage() {
  const premiumFeatures = await getAllPremiumFeatureService();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Btn variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Btn>
        </Link>
        <div>
          <h1 className="text-foreground mb-2 text-3xl font-bold">상품 등록</h1>
          <p className="text-muted-foreground">
            새로운 템플릿 상품을 등록합니다.
          </p>
        </div>
      </div>

      <ProductRegistrationForm premiumFeatures={premiumFeatures} />
    </div>
  );
}