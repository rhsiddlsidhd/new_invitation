"use client";

import { useState } from "react";

import { Plus, Edit, Trash2 } from "lucide-react";
import { Btn } from "@/components/atoms/Btn/Btn";
import { Card, CardContent } from "@/components/atoms/Card/Card";
import { Badge } from "@/components/atoms/Badge/Badge";
import { PremiumFeatureDialog } from "@/components/organisms/(admin)/PremiumFeatureDialog";

const initialFeatures = [
  {
    id: 1,
    code: "ANIMATION",
    label: "애니메이션 효과",
    description:
      "다양한 애니메이션 효과로 청첩장을 더욱 생동감 있게 만들어줍니다.",
    additionalPrice: 5000,
  },
  {
    id: 2,
    code: "MUSIC",
    label: "배경 음악",
    description: "원하는 배경 음악을 추가하여 감동을 더해줍니다.",
    additionalPrice: 3000,
  },
  {
    id: 3,
    code: "MAP",
    label: "지도 기능",
    description: "예식장 위치를 지도로 쉽게 안내합니다.",
    additionalPrice: 2000,
  },
  {
    id: 4,
    code: "GALLERY",
    label: "갤러리 기능",
    description: "사진을 더 많이 추가할 수 있는 갤러리 기능입니다.",
    additionalPrice: 4000,
  },
];

export default function PremiumFeaturesPage() {
  const [features, setFeatures] = useState(initialFeatures);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<
    (typeof initialFeatures)[0] | null
  >(null);

  const handleAddFeature = () => {
    setEditingFeature(null);
    setIsDialogOpen(true);
  };

  const handleEditFeature = (feature: (typeof initialFeatures)[0]) => {
    setEditingFeature(feature);
    setIsDialogOpen(true);
  };

  const handleDeleteFeature = (id: number) => {
    setFeatures(features.filter((f) => f.id !== id));
  };

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
        <Btn onClick={handleAddFeature}>
          <Plus className="mr-2 h-4 w-4" />
          기능 추가
        </Btn>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.id}>
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
                  <Btn
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditFeature(feature)}
                  >
                    <Edit className="mr-1 h-4 w-4" />
                    수정
                  </Btn>
                  <Btn
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteFeature(feature.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Btn>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PremiumFeatureDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        feature={editingFeature}
        onSave={(feature) => {
          if (editingFeature) {
            setFeatures(
              features.map((f) =>
                f.id === editingFeature.id ? { ...feature, id: f.id } : f,
              ),
            );
          } else {
            setFeatures([...features, { ...feature, id: features.length + 1 }]);
          }
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}
