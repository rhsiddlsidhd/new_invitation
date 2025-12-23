"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/Dialog/Dialog";
import { Input } from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import { Textarea } from "@/components/atoms/Textarea";
import type React from "react";

import { useEffect, useState } from "react";

interface PremiumFeature {
  code: string;
  label: string;
  description: string;
  additionalPrice: number;
}

interface PremiumFeatureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: PremiumFeature | null;
  onSave: (feature: PremiumFeature) => void;
}

export function PremiumFeatureDialog({
  open,
  onOpenChange,
  feature,
  onSave,
}: PremiumFeatureDialogProps) {
  const [formData, setFormData] = useState<PremiumFeature>({
    code: "",
    label: "",
    description: "",
    additionalPrice: 0,
  });

  useEffect(() => {
    if (feature) {
      setFormData(feature);
    } else {
      setFormData({
        code: "",
        label: "",
        description: "",
        additionalPrice: 0,
      });
    }
  }, [feature, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {feature ? "프리미엄 기능 수정" : "프리미엄 기능 추가"}
            </DialogTitle>
            <DialogDescription>
              상품에 추가할 수 있는 유료 기능을 등록합니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code">기능 코드 *</Label>
              <Input
                id="code"
                placeholder="예: ANIMATION"
                value={formData.code}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    code: e.target.value.toUpperCase(),
                  })
                }
                required
              />
              <p className="text-muted-foreground text-xs">
                영문 대문자와 언더스코어만 사용 가능합니다.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="label">기능 이름 *</Label>
              <Input
                id="label"
                placeholder="예: 애니메이션 효과"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">기능 설명 *</Label>
              <Textarea
                id="description"
                placeholder="기능에 대한 자세한 설명을 입력하세요."
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalPrice">추가 비용 *</Label>
              <div className="relative">
                <Input
                  id="additionalPrice"
                  type="number"
                  placeholder="0"
                  min="0"
                  step="1000"
                  value={formData.additionalPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      additionalPrice: Number(e.target.value),
                    })
                  }
                  required
                  className="pr-12"
                />
                <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-sm">
                  원
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Btn
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              취소
            </Btn>
            <Btn type="submit">{feature ? "수정" : "추가"}</Btn>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
