import { Upload, X } from "lucide-react";
import React, { useState } from "react";
import { LabeledInputBase } from "./LabeledInput";
import Thumbnail from "@/components/atoms/Thumbnail";
type LabeledImage = Omit<LabeledInputBase, "children"> & {
  preview?: boolean;
  widthPx?: number;
};
const LabeledImage = ({
  id,
  name,
  preview = false,
  widthPx = 100,
}: LabeledImage) => {
  const [previewImage, setPreviewImage] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const newFiles = Array.from(input.files || []);
    if (newFiles.length === 0) return;

    // 기존 파일 + 새 파일 합치기
    const allFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(allFiles);

    // input.files를 모든 파일로 업데이트
    const dataTransfer = new DataTransfer();
    allFiles.forEach((file) => dataTransfer.items.add(file));
    input.files = dataTransfer.files;

    // 새 파일들의 미리보기만 생성
    const readers = newFiles.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((results) => {
      setPreviewImage((prev) => [...prev, ...results]);
    });
  };

  const removeThumbnail = (index: number) => {
    // 미리보기 제거
    setPreviewImage((prev) => prev.filter((_, i) => i !== index));

    // state에서 파일 제거
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);

    // 실제 input의 파일도 제거
    const input = document.getElementById(id) as HTMLInputElement;
    if (!input) return;

    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => dataTransfer.items.add(file));
    input.files = dataTransfer.files;
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <label
        htmlFor={id}
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
          id={id}
          name={name}
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleThumbnailUpload}
        />
      </label>

      {/* Preview Grid */}
      {preview && previewImage.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {previewImage.map((image, index) => (
            <div
              key={index}
              className="border-border group relative aspect-square overflow-hidden rounded-lg border"
            >
              <Thumbnail
                src={image}
                alt={`Thumbnail ${index + 1}`}
                widthPx={widthPx}
              />
              <button
                type="button"
                onClick={() => removeThumbnail(index)}
                className="bg-background/90 hover:bg-background absolute top-2 right-2 rounded-full p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* {errors.thumbnailImages && <p className="text-sm text-destructive">{errors.thumbnailImages.message}</p>} */}
    </div>
  );
};

export default LabeledImage;
