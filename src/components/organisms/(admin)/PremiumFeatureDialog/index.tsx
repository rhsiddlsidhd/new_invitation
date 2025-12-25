"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
import { DialogFooter } from "@/components/atoms/Dialog/Dialog";
import { Input } from "@/components/atoms/Input/Input";

import { Textarea } from "@/components/atoms/Textarea";
import type React from "react";

import { useActionState } from "react";
import { PremiumFeature } from "@/services/premiumFeature.service";
import { updatePremiumFeatureAction } from "@/actions/updatePremiumFeatureAction";
import Alert from "@/components/atoms/Alert/Alert";
import { Label } from "@/components/atoms/Label/Label";

export function PremiumFeatureDialog({
  premiumFeature: feature,
}: {
  premiumFeature: PremiumFeature;
}) {
  const [state, action, pending] = useActionState(
    updatePremiumFeatureAction,
    null,
  );

  const error = state && !state.success && state.error.errors;

  return (
    <form action={action}>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="code">
            기능 코드 *
            {error && error["code"] && (
              <Alert type="error">{error["code"][0]}</Alert>
            )}
          </Label>
          <Input
            id="code"
            name="code"
            placeholder="예: ANIMATION"
            defaultValue={feature.code}
            required
          />
          <p className="text-muted-foreground text-xs">
            영문 대문자와 언더스코어만 사용 가능합니다.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="label">
            기능 이름 *
            {error && error["label"] && (
              <Alert type="error">{error["label"][0]}</Alert>
            )}
          </Label>
          <Input
            id="label"
            name="label"
            placeholder="예: 애니메이션 효과"
            defaultValue={feature.label}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            기능 설명 *
            {error && error["description"] && (
              <Alert type="error">{error["description"][0]}</Alert>
            )}
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="기능에 대한 자세한 설명을 입력하세요."
            rows={3}
            defaultValue={feature.description}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalPrice">
            추가 비용 *
            {error && error["additionalPrice"] && (
              <Alert type="error">{error["additionalPrice"][0]}</Alert>
            )}
          </Label>
          <div className="relative">
            <Input
              id="additionalPrice"
              name="additionalPrice"
              type="number"
              placeholder="0"
              min={0}
              step={1000}
              defaultValue={feature.additionalPrice}
              required
              className="pr-12"
            />
            <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-sm">
              원
            </span>
          </div>
        </div>

        <input
          type="hidden"
          id="featureId"
          name="featureId"
          value={feature._id}
        />
      </div>

      <DialogFooter>
        <Btn type="button" variant="outline">
          취소
        </Btn>
        <Btn type="submit" disabled={pending}>
          {pending ? "수정 중..." : "수정"}
        </Btn>
      </DialogFooter>
    </form>
  );
}
