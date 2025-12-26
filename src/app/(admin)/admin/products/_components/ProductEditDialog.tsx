"use client";

import type React from "react";
import { useActionState, useEffect, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { updateProductAction } from "@/actions/updateProductAction";
import type { Product } from "@/services/product.service";
import Alert from "@/components/atoms/Alert/Alert";
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
import usePremiumFeature from "@/hooks/usePremiumFeatures";
import Spinner from "@/components/atoms/Spinner/Spinner";
import Thumbnail from "@/components/atoms/Thumbnail";
import { getCategoryOptions } from "@/utils/category";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAdminModalStore } from "@/store/admin.modal.store";

interface ProductEditDialogProps {
  product: Product;
}

export function ProductEditDialog({ product }: ProductEditDialogProps) {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    updateProductAction.bind(null, product._id),
    null,
  );
  const closeModal = useAdminModalStore((state) => state.closeModal);
  const { premiumFeatures, loading } = usePremiumFeature();
  const [isPremium, setIsPremium] = useState(product.isPremium);
  const [isFeature, setIsFeature] = useState(product.feature);
  const [thumbnail, setThumbnail] = useState<string | null>(product.thumbnail);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    product.options || [],
  );
  const [status, setStatus] = useState(product.status);

  useEffect(() => {
    if (state && state.success) {
      toast.message(state.data.message);
      closeModal();
    }
  }, [state, router, closeModal]);

  useEffect(() => {
    if (!isPremium) {
      setSelectedFeatures([]);
    }
  }, [isPremium]);

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
    setThumbnail(product.thumbnail);
    setThumbnailFile(null);
    const fileInput = document.getElementById(
      "edit-thumbnail-input",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleFeatureChange = (checked: boolean, id: string) => {
    setSelectedFeatures((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
    );
  };

  const error = state && !state.success && state.error.errors;

  // 로딩 중일 때 스피너 표시
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner />
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      {/* Hidden inputs for selected features */}
      {selectedFeatures.map((featureId) => (
        <input key={featureId} type="hidden" name="options" value={featureId} />
      ))}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="edit-thumbnail-input">
            썸네일 이미지 *
            {error && error["thumbnail"] && (
              <Alert type="error">{error["thumbnail"][0]}</Alert>
            )}
          </Label>
          <div className="border-border group relative aspect-video w-full overflow-hidden rounded-lg border">
            <Thumbnail
              src={thumbnail || "/placeholder.svg"}
              widthPx={490}
              alt={`${product.title} 이미지`}
            />
            <label
              htmlFor="edit-thumbnail-input"
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <div className="text-center text-white">
                <UploadCloud className="mx-auto mb-2 h-8 w-8" />
                <p className="text-sm font-medium">
                  {thumbnailFile ? "다른 이미지로 변경" : "이미지 변경"}
                </p>
              </div>
            </label>
            {thumbnailFile && (
              <Btn
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleRemoveThumbnail}
                className="absolute top-2 right-2 z-10 h-8 w-8"
                title="원래 이미지로 되돌리기"
              >
                <X className="h-4 w-4" />
              </Btn>
            )}

            {thumbnailFile && (
              <p className="text-muted-foreground text-sm">
                새 이미지가 선택되었습니다. 저장하려면 상품 수정을 클릭하세요.
              </p>
            )}

            <input
              id="edit-thumbnail-input"
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
            <input
              type="hidden"
              name="currentThumbnail"
              value={product.thumbnail}
            />
          </div>
        </div>

        {/* 상품명 */}
        <div>
          <Label htmlFor="edit-title">
            상품명 *
            {error && error["title"] && (
              <Alert type="error">{error["title"][0]}</Alert>
            )}
          </Label>
          <Input
            id="edit-title"
            name="title"
            defaultValue={product.title}
            placeholder="예: 엘레강트 로즈 청첩장"
            required
          />
        </div>

        {/* 카테고리 + 판매상태 */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="edit-category">
              카테고리 *
              {error && error["category"] && (
                <Alert type="error">{error["category"][0]}</Alert>
              )}
            </Label>
            <Select name="category" defaultValue={product.category}>
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
          </div>
          <div className="flex-1">
            <Label htmlFor="edit-status">판매 상태 *</Label>
            <Select
              name="status"
              value={status}
              onValueChange={(value) =>
                setStatus(value as "active" | "inactive" | "soldOut")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="판매 상태를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">판매중</SelectItem>
                <SelectItem value="inactive">비활성</SelectItem>
                <SelectItem value="soldOut">품절</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 상품설명 */}
        <div>
          <Label htmlFor="edit-description">
            상품 설명 *
            {error && error["description"] && (
              <Alert type="error">{error["description"][0]}</Alert>
            )}
          </Label>
          <Textarea
            id="edit-description"
            name="description"
            defaultValue={product.description}
            placeholder="상품에 대한 자세한 설명을 입력하세요."
            rows={3}
            required
          />
        </div>

        {/* 추천 상품 */}
        <div className="border-border flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="edit-feature" className="text-base">
              추천 상품
            </Label>
            <p className="text-muted-foreground text-sm">
              메인 페이지에 추천 상품으로 노출됩니다.
            </p>
          </div>
          <Switch
            id="edit-feature"
            checked={isFeature}
            onCheckedChange={setIsFeature}
          />
        </div>
        <input
          type="hidden"
          name="feature"
          value={isFeature ? "true" : "false"}
        />
        <input
          type="hidden"
          name="isPremium"
          value={isPremium ? "true" : "false"}
        />

        {/* 기본 가격 */}
        <div>
          <Label htmlFor="edit-price">
            기본 가격 *
            {error && error["price"] && (
              <Alert type="error">{error["price"][0]}</Alert>
            )}
          </Label>
          <div className="relative">
            <Input
              id="edit-price"
              name="price"
              type="number"
              defaultValue={product.price}
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
        </div>

        {/* 추천 우선순위 */}
        <div>
          <Label htmlFor="edit-priority">
            추천 우선순위
            {error && error["priority"] && (
              <Alert type="error">{error["priority"][0]}</Alert>
            )}
          </Label>
          <Input
            id="edit-priority"
            name="priority"
            type="number"
            defaultValue={product.priority}
            placeholder="0"
            min="0"
            max="100"
            step="1"
          />
          <p className="text-muted-foreground text-xs">
            높은 숫자일수록 상단에 노출됩니다 (0-100)
          </p>
        </div>

        {/* 프리미엄 상품 (col-span-2) */}
        <div className="col-span-2 flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="edit-isPremium" className="text-base">
              프리미엄 상품
            </Label>
            <p className="text-muted-foreground text-sm">
              추가 유료 옵션을 제공하는 상품입니다.
            </p>
          </div>
          <Switch
            id="edit-isPremium"
            checked={isPremium}
            onCheckedChange={setIsPremium}
          />
        </div>

        {isPremium && (
          <div className="col-span-2 space-y-4 rounded-lg border border-dashed p-4">
            <h4 className="text-foreground font-medium">
              프리미엄 기능 선택{" "}
              {state && !state.success && state.error.errors && (
                <Alert type="error">{state.error.errors["options"]}</Alert>
              )}{" "}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {premiumFeatures.map((feature) => (
                <div key={feature.code} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit-feature-${feature.code}`}
                    checked={selectedFeatures.includes(feature._id)}
                    onCheckedChange={(checked) =>
                      handleFeatureChange(!!checked, feature._id)
                    }
                  />
                  <Label
                    htmlFor={`edit-feature-${feature.code}`}
                    className="cursor-pointer text-sm leading-none font-medium"
                  >
                    {feature.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4 border-t pt-4">
        <Btn type="button" variant="outline">
          취소
        </Btn>
        <Btn type="submit" className="min-w-30" disabled={pending}>
          {pending ? "수정 중..." : "상품 수정"}
        </Btn>
      </div>
    </form>
  );
}
