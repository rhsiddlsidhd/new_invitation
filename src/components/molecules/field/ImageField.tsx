import { Upload, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { InputFieldBase } from "./InputField";
import LoaderThumbnail from "@/components/atoms/LoaderThumbnail";

interface ImageItem {
  type: "existing" | "new";
  id: string;
  preview: string;
  file?: File;
  originalUrl?: string;
}

type ImageFieldProps = Omit<InputFieldBase, "children"> & {
  preview?: boolean;
  sizes?: string;
  defaultImages?: string[];
};

const ImageField = ({
  id,
  name,
  preview = false,
  sizes = "100px",
  defaultImages = [],
}: ImageFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageItem[]>([]);

  // defaultImages를 ImageItem으로 변환하여 초기화
  useEffect(() => {
    if (defaultImages.length > 0) {
      const initialImages: ImageItem[] = defaultImages.map((url, index) => ({
        type: "existing",
        id: `existing-${index}-${Date.now()}`,
        preview: url,
        originalUrl: url,
      }));
      setImages(initialImages);
    }
  }, [defaultImages]);

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length === 0) return;

    // 각 파일을 ImageItem으로 변환
    const newImageItems: ImageItem[] = await Promise.all(
      newFiles.map(async (file: File) => {
        const preview = await readFileAsDataURL(file);
        return {
          type: "new" as const,
          id: crypto.randomUUID(),
          preview,
          file,
        };
      }),
    );

    setImages((prev) => [...prev, ...newImageItems]);
  };

  // 헬퍼 함수: File을 base64로 변환
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          resolve(result);
        } else {
          reject(new Error("Failed to read file as data URL"));
        }
      };
      reader.onerror = () => reject(new Error("FileReader error"));
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  // images 변경 시 input.files 동기화 (새 파일만)
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const newFiles = images
      .filter((img) => img.type === "new" && img.file)
      .map((img) => img.file!);

    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => dataTransfer.items.add(file));
    input.files = dataTransfer.files;
  }, [images]);

  // 기존 이미지 URL 추출 (hidden input용)
  const existingUrls = images
    .filter((img) => img.type === "existing")
    .map((img) => img.originalUrl);

  return (
    <div className="space-y-4">
      {/* Hidden Input: 기존 이미지 URL 전달 */}
      <input
        type="hidden"
        name={`${name}_existing`}
        value={JSON.stringify(existingUrls)}
      />

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
          ref={inputRef}
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
      {preview && images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="border-border group relative aspect-square overflow-hidden rounded-lg border"
            >
              <LoaderThumbnail
                src={image.preview}
                alt={`Image ${image.id}`}
                sizes={sizes}
              />
              <button
                type="button"
                onClick={() => removeImage(image.id)}
                className="bg-background/90 hover:bg-background absolute top-2 right-2 rounded-full p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageField;
