"use client";

import type React from "react";

import { Upload, X, Plus } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Label } from "@/components/atoms/Label/Label";
import { Btn } from "@/components/atoms/Btn/Btn";
import { Input } from "@/components/atoms/Input/Input";

export function ImagesSection() {
  //   const {
  //     formState: { errors },
  //     setValue,
  //     watch,
  //   } = form

  //   const thumbnailImages = watch("thumbnailImages") || []
  //   const galleryCategories = watch("galleryCategories") || []

  // Thumbnail image upload handler
  //   const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const files = Array.from(e.target.files || [])
  //     if (files.length === 0) return

  //     const readers = files.map((file) => {
  //       return new Promise<string>((resolve) => {
  //         const reader = new FileReader()
  //         reader.onload = (e) => resolve(e.target?.result as string)
  //         reader.readAsDataURL(file)
  //       })
  //     })

  //     Promise.all(readers).then((results) => {
  //       setValue("thumbnailImages", [...thumbnailImages, ...results])
  //     })
  //   }

  //   const removeThumbnail = (index: number) => {
  //     setValue(
  //       "thumbnailImages",
  //       thumbnailImages.filter((_, i) => i !== index),
  //     )
  //   }

  // Gallery category handlers
  //   const addGalleryCategory = () => {
  //     const newCategory: GalleryCategory = {
  //       id: Date.now().toString(),
  //       categoryName: "",
  //       images: [],
  //     }
  //     setValue("galleryCategories", [...galleryCategories, newCategory])
  //   }

  //   const removeGalleryCategory = (index: number) => {
  //     setValue(
  //       "galleryCategories",
  //       galleryCategories.filter((_, i) => i !== index),
  //     )
  //   }

  //   const updateCategoryName = (index: number, name: string) => {
  //     const updated = [...galleryCategories]
  //     updated[index].categoryName = name
  //     setValue("galleryCategories", updated)
  //   }

  //   const handleGalleryImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
  //     const files = Array.from(e.target.files || [])
  //     if (files.length === 0) return

  //     const readers = files.map((file) => {
  //       return new Promise<string>((resolve) => {
  //         const reader = new FileReader()
  //         reader.onload = (e) => resolve(e.target?.result as string)
  //         reader.readAsDataURL(file)
  //       })
  //     })

  //     Promise.all(readers).then((results) => {
  //       const updated = [...galleryCategories]
  //       updated[index].images = [...updated[index].images, ...results]
  //       setValue("galleryCategories", updated)
  //     })
  //   }

  //   const removeGalleryImage = (categoryIndex: number, imageIndex: number) => {
  //     const updated = [...galleryCategories]
  //     updated[categoryIndex].images = updated[categoryIndex].images.filter((_, i) => i !== imageIndex)
  //     setValue("galleryCategories", updated)
  //   }

  return (
    <Card>
      <CardHeader>
        <CardTitle>이미지 설정</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Thumbnail Images */}
        <div className="space-y-4">
          <div>
            <Label className="text-base">메인 이미지 *</Label>
            <p className="text-muted-foreground mt-1 text-sm">
              청첩장에 표시될 메인 이미지를 업로드하세요. (최대 10장)
            </p>
          </div>

          {/* Upload Button */}
          <label
            htmlFor="thumbnail-upload"
            className="border-border hover:bg-accent/50 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors"
          >
            <Upload className="text-muted-foreground mb-2 h-8 w-8" />
            <p className="text-muted-foreground mb-1 text-sm">
              클릭하여 이미지 업로드
            </p>
            <p className="text-muted-foreground text-xs">
              PNG, JPG, WEBP (최대 5MB)
            </p>
            <input
              id="thumbnail-upload"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              //   onChange={handleThumbnailUpload}
            />
          </label>

          {/* Preview Grid */}
          {/* {thumbnailImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {thumbnailImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden border border-border group"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeThumbnail(index)}
                    className="absolute top-2 right-2 p-1.5 bg-background/90 rounded-full hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )} */}

          {/* {errors.thumbnailImages && <p className="text-sm text-destructive">{errors.thumbnailImages.message}</p>} */}
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
            <Btn type="button" variant="outline" size="sm">
              {/* onClick={addGalleryCategory} */}
              <Plus className="mr-2 h-4 w-4" />
              카테고리 추가
            </Btn>
          </div>

          {/* Category List */}
          <div className="space-y-6">
            {/* {galleryCategories.map((category, categoryIndex) => (
              <div key={category.id} className="p-6 border border-border rounded-lg space-y-4 bg-muted/20">
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`category-name-${category.id}`}>카테고리 이름</Label>
                    <Input
                      id={`category-name-${category.id}`}
                      placeholder="예: 스튜디오 사진"
                      value={category.categoryName}
                      onChange={(e) => updateCategoryName(categoryIndex, e.target.value)}
                    />
                  </div>
                  <Btn
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeGalleryCategory(categoryIndex)}
                    className="mt-7"
                  >
                    <X className="w-4 h-4" />
                  </Btn>
                </div>

             
                <div className="space-y-3">
                  <label
                    htmlFor={`gallery-upload-${category.id}`}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">이미지 업로드</p>
                    <input
                      id={`gallery-upload-${category.id}`}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleGalleryImageUpload(categoryIndex, e)}
                    />
                  </label>

             
                  {category.images.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {category.images.map((image, imageIndex) => (
                        <div
                          key={imageIndex}
                          className="relative aspect-square rounded-lg overflow-hidden border border-border group"
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Gallery ${imageIndex + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(categoryIndex, imageIndex)}
                            className="absolute top-1 right-1 p-1 bg-background/90 rounded-full hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))} */}
          </div>

          {/* onClick={addGalleryCategory} */}
          {/* {galleryCategories.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-4">아직 추가된 갤러리 카테고리가 없습니다.</p>
              <Btn type="button" variant="outline" size="sm" >
                
                <Plus className="w-4 h-4 mr-2" />첫 번째 카테고리 추가
              </Btn>
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
}
