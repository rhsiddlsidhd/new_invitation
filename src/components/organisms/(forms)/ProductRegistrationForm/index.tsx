"use client";

import type React from "react";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import { createProductAction } from "@/actions/createProductAction";
import type { PremiumFeature } from "@/services/premiumFeature.service";
import Alert from "@/components/atoms/Alert/Alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";

import { Input } from "@/components/atoms/Input/Input";
import { Btn } from "@/components/atoms/Btn/Btn";
import { Textarea } from "@/components/atoms/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";
import { Switch } from "@/components/atoms/Switch";
import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";
import { Label } from "@/components/atoms/Label/Label";
import { getCategoryOptions } from "@/utils/category";
import { getFieldError } from "@/utils/error";
import { APIResponse } from "@/types/error";

interface ProductRegistrationFormProps {
  premiumFeatures: PremiumFeature[];
}

// feature: boolean; // 추천 상품 여부 (메인 노출용)
// priority: number; // 관리자 정렬 우선순위 (높을수록 상단)

export function ProductRegistrationForm({
  premiumFeatures,
}: ProductRegistrationFormProps) {
  const router = useRouter();
  const [state, action, pending] = useActionState<
    APIResponse<{ message: string }>,
    FormData
  >(createProductAction, null);
  const [isPremium, setIsPremium] = useState(false);
  const [isFeature, setIsFeature] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<
    PremiumFeature["_id"][]
  >([]);

  useEffect(() => {
    if (state && state.success) {
      alert(state.data.message);
      setThumbnail(null);
    }
  }, [state, router]);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnail(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null);
    setThumbnailFile(null);
    const fileInput = document.getElementById(
      "thumbnail-input",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleFeatureChange = (checked: boolean, code: string) => {
    setSelectedFeatures((prev) =>
      checked ? [...prev, code] : prev.filter((item) => item !== code),
    );
  };

  const titleError = getFieldError(state, "title");
  const descriptionError = getFieldError(state, "description");
  const categoryError = getFieldError(state, "category");
  const priceError = getFieldError(state, "price");
  const priorityError = getFieldError(state, "priority");
  const thumbnailError = getFieldError(state, "thumbnail");

  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-8 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
              <CardDescription>
                상품의 이름, 설명, 카테고리를 입력합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">상품명 *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="예: 엘레강트 로즈 청첩장"
                  required
                />
                {titleError && <Alert type="error">{titleError}</Alert>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">상품 설명 *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="상품에 대한 자세한 설명을 입력하세요."
                  rows={4}
                  required
                />
                {descriptionError && (
                  <Alert type="error">{descriptionError}</Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">카테고리 *</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {getCategoryOptions().map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {categoryError && <Alert type="error">{categoryError}</Alert>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>가격 정보</CardTitle>
              <CardDescription>
                상품의 가격 및 프리미엄 옵션을 설정합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="price">기본 가격 *</Label>
                <div className="relative">
                  <Input
                    id="price"
                    name="price"
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
                {priceError && <Alert type="error">{priceError}</Alert>}
              </div>

              <div className="border-border flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="isPremium" className="text-base">
                    프리미엄 상품
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    추가 유료 옵션을 제공하는 상품입니다.
                  </p>
                </div>
                <Switch
                  id="isPremium"
                  checked={isPremium}
                  onCheckedChange={() =>
                    setIsPremium(
                      (prev) => !prev || (setSelectedFeatures([]), false),
                    )
                  }
                />
              </div>
              <input
                type="hidden"
                name="isPremium"
                value={isPremium.toString()}
              />

              {isPremium && (
                <div className="space-y-4 rounded-lg border border-dashed p-4">
                  <h4 className="text-foreground font-medium">
                    프리미엄 기능 선택
                  </h4>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {premiumFeatures.map((feature) => (
                      <div
                        key={feature.code}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`feature-${feature.code}`}
                          checked={selectedFeatures.includes(feature._id)}
                          onCheckedChange={(checked) =>
                            handleFeatureChange(!!checked, feature._id)
                          }
                        />
                        <Label
                          htmlFor={`feature-${feature.code}`}
                          className="cursor-pointer text-sm leading-none font-medium"
                        >
                          {feature.label}
                        </Label>
                        <Input
                          id={`feature-${feature.code}`}
                          key={feature.code}
                          type="hidden"
                          name="options"
                          value={feature._id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>노출 설정</CardTitle>
              <CardDescription>
                상품 노출 및 정렬 순서를 관리합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-border flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="feature" className="text-base">
                    추천 상품
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    메인 페이지에 추천 상품으로 노출됩니다.
                  </p>
                </div>
                <Switch
                  id="feature"
                  checked={isFeature}
                  onCheckedChange={setIsFeature}
                />
              </div>
              <input
                type="hidden"
                name="feature"
                value={isFeature.toString()}
              />

              <div className="space-y-2">
                <Label htmlFor="priority">추천 우선순위</Label>
                <Input
                  id="priority"
                  name="priority"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  step="1"
                  defaultValue="0"
                />
                {priorityError && <Alert type="error">{priorityError}</Alert>}
                <p className="text-muted-foreground text-xs">
                  높은 숫자일수록 상단에 노출됩니다 (0-100)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>썸네일 이미지</CardTitle>
              <CardDescription>
                상품 목록에 표시될 대표 이미지를 등록합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="thumbnail-input">썸네일 이미지 *</Label>

                {thumbnail ? (
                  <div className="border-border relative aspect-video w-full overflow-hidden rounded-lg border">
                    <Image
                      src={thumbnail}
                      alt="Thumbnail"
                      fill
                      className="object-cover"
                    />
                    <Btn
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={handleRemoveThumbnail}
                      className="absolute top-2 right-2 h-6 w-6"
                    >
                      <X className="h-4 w-4" />
                    </Btn>
                  </div>
                ) : (
                  <label
                    htmlFor="thumbnail-input"
                    className="border-border bg-accent/20 hover:bg-accent/40 flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors"
                  >
                    <UploadCloud className="text-muted-foreground mb-2 h-8 w-8" />
                    <p className="text-muted-foreground mb-1 text-sm">
                      클릭하여 이미지 업로드
                    </p>
                    <p className="text-muted-foreground text-xs">
                      PNG, JPG, WEBP (최대 5MB)
                    </p>
                  </label>
                )}

                <input
                  id="thumbnail-input"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                />
                <input
                  type="file"
                  name="thumbnail"
                  className="hidden"
                  ref={(input) => {
                    if (input && thumbnailFile) {
                      const dataTransfer = new DataTransfer();
                      dataTransfer.items.add(thumbnailFile);
                      input.files = dataTransfer.files;
                    }
                  }}
                />
                {thumbnailError && (
                  <Alert type="error">{thumbnailError}</Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hidden inputs for selected features */}
      {selectedFeatures.map((code) => (
        <input key={code} type="hidden" name="premiumFeatures" value={code} />
      ))}

      <div className="flex justify-end gap-4 pt-4">
        <Btn
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
        >
          취소
        </Btn>
        <Btn type="submit" className="min-w-30" disabled={pending}>
          {pending ? "등록 중..." : "상품 등록"}
        </Btn>
      </div>
    </form>
  );
}
