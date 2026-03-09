import React from "react";
import { FieldBase } from "@/types/field";
import { useImageField } from "@/hooks/useImageField";
import { ImageUploadTrigger } from "@/components/molecules/ImageUploadTrigger";
import { ImagePreviewGrid } from "@/components/molecules/ImagePreviewGrid";

type ImageFieldProps = Omit<FieldBase, "children"> & {
  preview?: boolean;
  sizes?: string;
  defaultImages?: string[];
  multiple?: boolean;
};

/**
 * 이미지 업로드 및 미리보기를 지원하는 필드 (Organism)
 * [UI]: Molecules(Trigger, Grid, Item)로 쪼개어 가시성을 높임
 * [Service]: useImageField 훅으로 상태 관리 및 파일 핸들링 캡슐화
 */
const ImageField = ({
  id,
  name,
  preview = false,
  sizes = "100px",
  defaultImages = [],
  multiple = true,
}: ImageFieldProps) => {
  const { fileList, onFileChange, removeImage, inputRef, existingUrls } =
    useImageField(defaultImages);

  return (
    <div className="space-y-4">
      {/* 1. 서버 동기화를 위한 Hidden Input (Existing URLs) */}
      <input
        type="hidden"
        name={`${name}_existing`}
        value={JSON.stringify(existingUrls)}
      />

      {/* 2. 업로드 행위 트리거 (FileUpload) */}
      <ImageUploadTrigger
        id={id}
        name={name}
        inputRef={inputRef}
        onChange={onFileChange}
        multiple={multiple}
      />

      {/* 3. 미리보기 디스플레이 (PreviewDisplay) */}
      {preview && (
        <ImagePreviewGrid
          fileList={fileList}
          onRemove={removeImage}
          sizes={sizes}
        />
      )}
    </div>
  );
};

export default ImageField;
