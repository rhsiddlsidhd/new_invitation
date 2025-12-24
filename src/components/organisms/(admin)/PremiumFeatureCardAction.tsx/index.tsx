"use client";
import React, { useState } from "react";
import { PremiumFeatureDialog } from "../PremiumFeatureDialog";
import { Btn } from "@/components/atoms/Btn/Btn";
import { Edit, Trash2 } from "lucide-react";
import { PremiumFeature } from "@/services/premiumFeature.service";

const PremiumFeatureCardAction = ({ feature }: { feature: PremiumFeature }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex gap-2">
      <Btn size="sm" variant="outline" onClick={() => setIsDialogOpen(true)}>
        <Edit className="mr-1 h-4 w-4" />
        수정
      </Btn>
      <Btn size="sm" variant="outline">
        <Trash2 className="h-4 w-4" />
      </Btn>
      <PremiumFeatureDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        feature={feature}
      />
    </div>
  );
};

export default PremiumFeatureCardAction;
