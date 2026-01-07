"use client";

import type React from "react";

import { X, Plus } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Label } from "@/components/atoms/Label/Label";
import { Btn } from "@/components/atoms/Btn/Btn";
import { Input } from "@/components/atoms/Input/Input";
import LabeledImage from "@/components/molecules/(input-group)/LabeledImage";
import { useState, useEffect } from "react";
import useFetchCoupleInfo from "@/hooks/useFetchCoupleInfo";

interface GalleryCategory {
  id: string;
  categoryName: string;
  images: string[];
}

export function ImagesSection() {
  const [galleryCategories, setGalleryCategories] = useState<GalleryCategory[]>(
    [],
  );
  const { data, isLoading } = useFetchCoupleInfo();

  // 데이터 로드 시 갤러리 카테고리 초기화
  useEffect(() => {
    if (data?.galleryImages && data.galleryImages.length > 0) {
      const initialCategories: GalleryCategory[] = data.galleryImages.map(
        (gallery) => ({
          id: crypto.randomUUID(),
          categoryName: gallery.category,
          images: gallery.urls,
        }),
      );
      setGalleryCategories(initialCategories);
    }
  }, [data]);
  const addGalleryCategory = () => {
    const newCategory: GalleryCategory = {
      id: crypto.randomUUID(),
      categoryName: "",
      images: [],
    };
    setGalleryCategories((prev) => [...prev, newCategory]);
  };

  const removeGalleryCategory = (index: number) => {
    setGalleryCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCategoryName = (index: number, name: string) => {
    const updated = [...galleryCategories];
    updated[index].categoryName = name;
    setGalleryCategories(updated);
  };

  if (isLoading) return <div>로딩중...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>이미지 설정</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Thumbnail Images */}
        <div>
          <div className="space-y-4">
            <Label className="text-base">메인 이미지 *</Label>
            <p className="text-muted-foreground mt-1 text-sm">
              청첩장에 표시될 메인 이미지를 업로드하세요. (최대 10장)
            </p>
            <LabeledImage
              id="thumbnail-upload"
              name="thumbnail-upload"
              preview={true}
              widthPx={259}
              defaultImages={data?.thumbnailImages}
            />
          </div>
        </div>
        {/* Gallery Categories */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">갤러리</Label>
              <p className="text-muted-foreground mt-1 text-sm">
                카테고리별로 이미지를 분류하여 업로드하세요.
              </p>
            </div>
            <Btn
              type="button"
              variant="outline"
              size="sm"
              onClick={addGalleryCategory}
            >
              <Plus className="mr-2 h-4 w-4" />
              카테고리 추가
            </Btn>
          </div>

          {/* Category List */}
          <div className="space-y-6">
            {galleryCategories.map((category, categoryIndex) => (
              <div
                key={category.id}
                className="border-border bg-muted/20 space-y-4 rounded-lg border p-6"
              >
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`category-name-${category.id}`}>
                      카테고리 이름
                    </Label>
                    <Input
                      id={`category-name-${category.id}`}
                      name={`category-name-${category.id}`}
                      placeholder="예: 스튜디오 사진"
                      value={category.categoryName}
                      onChange={(e) =>
                        updateCategoryName(categoryIndex, e.target.value)
                      }
                      required
                    />
                  </div>
                  <Btn
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeGalleryCategory(categoryIndex)}
                  >
                    <X className="h-4 w-4" />
                  </Btn>
                </div>

                <div className="space-y-3">
                  <LabeledImage
                    id={`gallery-upload-${category.id}`}
                    name={`gallery-upload-${category.id}`}
                    preview={true}
                    widthPx={259}
                    defaultImages={category.images}
                  />
                </div>
              </div>
            ))}
          </div>

          {galleryCategories.length === 0 && (
            <div className="border-border flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12 text-center">
              <p className="text-muted-foreground mb-4 text-sm">
                아직 추가된 갤러리 카테고리가 없습니다.
              </p>
              <Btn
                type="button"
                variant="outline"
                size="sm"
                onClick={addGalleryCategory}
              >
                <Plus className="mr-2 h-4 w-4" />첫 번째 카테고리 추가
              </Btn>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
