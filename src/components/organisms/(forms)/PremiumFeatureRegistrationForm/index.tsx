"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
import { Input } from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import { Textarea } from "@/components/atoms/Textarea";

interface PremiumFeatureForm {
  code: string;
  label: string;
  description: string;
  additionalPrice: number;
}

const PremiumFeatureRegistrationForm = () => {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="code">기능 코드 *</Label>
        <Input id="code" placeholder="예: ANIMATION, MUSIC, MAP" required />
        <p className="text-muted-foreground text-xs">
          영문 대문자와 언더스코어만 사용 가능합니다. (예: PREMIUM_ANIMATION)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="label">기능 이름 *</Label>
        <Input id="label" placeholder="예: 애니메이션 효과" required />
        <p className="text-muted-foreground text-xs">
          고객에게 표시될 기능의 이름입니다.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">기능 설명 *</Label>
        <Textarea
          id="description"
          placeholder="기능에 대한 자세한 설명을 입력하세요."
          rows={5}
          required
          className="resize-none"
        />
        <p className="text-muted-foreground text-xs">
          기능의 특징과 장점을 상세하게 작성해주세요. (최소 20자 이상)
        </p>
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
            required
            className="pr-12"
          />
          <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-sm">
            원
          </span>
        </div>
        <p className="text-muted-foreground text-xs">
          이 기능을 추가할 때 부과되는 추가 비용입니다.
        </p>
      </div>

      <div className="bg-muted/50 border-border space-y-2 rounded-lg border p-4">
        <h3 className="text-foreground text-sm font-semibold">미리보기</h3>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-muted-foreground">코드:</span>{" "}
            <span className="font-mono font-semibold"></span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">이름:</span>{" "}
            <span className="font-semibold"></span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">설명:</span> <span></span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">추가 비용:</span>{" "}
            <span className="text-primary font-semibold">+{}원</span>
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Btn type="button" variant="outline">
          취소
        </Btn>
        <Btn type="submit">등록하기</Btn>
      </div>
    </form>
  );
};

export default PremiumFeatureRegistrationForm;
