import { Badge } from "@/components/atoms/Badge/Badge";
import { Card, CardContent } from "@/components/atoms/Card/Card";
import PremiumFeatureCardAction from "@/components/organisms/(admin)/PremiumFeatureCardAction.tsx";
import { getAllPremiumFeatureService } from "@/services/premiumFeature.service";

export default async function PremiumFeaturesPage() {
  const features = await getAllPremiumFeatureService();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            프리미엄 기능 관리
          </h1>
          <p className="text-muted-foreground">
            상품에 추가할 수 있는 유료 기능을 관리합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.code}>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-foreground text-lg font-semibold">
                      {feature.label}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {feature.code}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="border-border flex items-center justify-between border-t pt-4">
                <div>
                  <p className="text-muted-foreground mb-1 text-xs">
                    추가 비용
                  </p>
                  <p className="text-primary text-xl font-bold">
                    +{feature.additionalPrice.toLocaleString()}원
                  </p>
                </div>
                <div className="flex gap-2">
                  <PremiumFeatureCardAction premiumFeature={feature} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
