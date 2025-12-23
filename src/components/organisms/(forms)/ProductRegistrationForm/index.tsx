"use client";

import type React from "react";

import { useState } from "react";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import Label from "@/components/atoms/Label/Label";
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

export function ProductRegistrationForm() {
  const [isPremium, setIsPremium] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnail(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Form submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">상품명 *</Label>
            <Input id="title" placeholder="예: 엘레강트 로즈 청첩장" required />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">상품 설명 *</Label>
            <Textarea
              id="description"
              placeholder="상품에 대한 자세한 설명을 입력하세요."
              rows={4}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">카테고리 *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="카테고리를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">클래식</SelectItem>
                <SelectItem value="modern">모던</SelectItem>
                <SelectItem value="romantic">로맨틱</SelectItem>
                <SelectItem value="minimal">미니멀</SelectItem>
                <SelectItem value="vintage">빈티지</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <Label>썸네일 이미지 *</Label>
            {thumbnail ? (
              <div className="border-border relative h-64 w-full overflow-hidden rounded-lg border">
                <Image
                  src={thumbnail || "/placeholder.svg"}
                  alt="Thumbnail"
                  fill
                />
                <button
                  type="button"
                  onClick={() => setThumbnail(null)}
                  className="bg-background/80 hover:bg-background absolute top-2 right-2 rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="thumbnail"
                className="border-border hover:bg-accent/50 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors"
              >
                <Upload className="text-muted-foreground mb-2 h-8 w-8" />
                <p className="text-muted-foreground mb-1 text-sm">
                  클릭하여 이미지 업로드
                </p>
                <p className="text-muted-foreground text-xs">
                  PNG, JPG, WEBP (최대 5MB)
                </p>
                <input
                  id="thumbnail"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                />
              </label>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>가격 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">기본 가격 *</Label>
            <div className="relative">
              <Input
                id="price"
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
          </div>

          {/* Premium Toggle */}
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
              onCheckedChange={setIsPremium}
            />
          </div>

          {/* Premium Options - Shown when isPremium is true */}
          {isPremium && (
            <div className="bg-accent/30 space-y-4 rounded-lg p-4">
              <h4 className="text-foreground font-medium">
                프리미엄 옵션 설정
              </h4>
              <p className="text-muted-foreground text-sm">
                이 상품에 추가할 수 있는 유료 옵션을 설정합니다. 프리미엄 기능
                관리 페이지에서 미리 등록된 기능을 선택할 수 있습니다.
              </p>
              <Btn type="button" variant="outline" size="sm">
                프리미엄 기능 선택
              </Btn>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Btn type="submit" className="flex-1">
          상품 등록
        </Btn>
        <Btn type="button" variant="outline">
          취소
        </Btn>
      </div>
    </form>
  );
}
