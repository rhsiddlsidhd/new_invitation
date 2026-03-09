import React from "react";
import { ImageFileState } from "@/hooks/useImageField";
import { ImagePreviewItem } from "./ImagePreviewItem";

interface ImagePreviewGridProps {
  fileList: ImageFileState[];
  onRemove: (id: string) => void;
  sizes?: string;
}

/**
 * 업로드된 이미지들의 미리보기를 격자 형태로 보여주는 레이아웃 (Molecule)
 */
export const ImagePreviewGrid = ({
  fileList,
  onRemove,
  sizes = "100px",
}: ImagePreviewGridProps) => {
  if (fileList.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {fileList.map((image) => (
        <ImagePreviewItem
          key={image.id}
          id={image.id}
          preview={image.preview}
          sizes={sizes}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};
