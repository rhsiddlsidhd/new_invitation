import React, { useRef, ChangeEvent } from "react";
import { Upload, Plus } from "lucide-react";
import { ImagePreviewItem } from "@/components/molecules/ImagePreviewItem";
import { Button } from "@/components/atoms/button";
import type { ImageItem } from "@/hooks/useImageList";

interface ImageFieldProps {
  id: string;
  items: ImageItem[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
  multiple?: boolean;
  sizes?: string;
}

const ImageField = ({
  id,
  items,
  onAdd,
  onRemove,
  multiple = true,
  sizes = "100px",
}: ImageFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) onAdd(files);
    e.target.value = "";
  };

  return (
    <div>
      <input
        ref={inputRef}
        id={id}
        type="file"
        className="hidden"
        accept="image/*"
        multiple={multiple}
        onChange={handleChange}
      />

      {items.length === 0 ? (
        <label
          htmlFor={id}
          className="border-border hover:bg-accent/50 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors"
        >
          <Upload className="text-muted-foreground mb-2 h-8 w-8" />
          <p className="text-muted-foreground mb-1 text-sm">
            클릭하여 이미지 업로드
          </p>
          <p className="text-muted-foreground text-xs">
            PNG, JPG, WEBP (최대 10MB)
          </p>
        </label>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item) => (
            <ImagePreviewItem
              key={item.id}
              id={item.id}
              preview={item.preview}
              sizes={sizes}
              onRemove={onRemove}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            className="aspect-square h-full w-full border-dashed"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageField;
