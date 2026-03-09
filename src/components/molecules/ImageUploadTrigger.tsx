import { Upload } from "lucide-react";
import React from "react";

interface ImageUploadTriggerProps {
  id: string;
  name: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
}

/**
 * 이미지 업로드를 위한 점선 박스 트리거 (Molecule)
 */
export const ImageUploadTrigger = ({
  id,
  name,
  inputRef,
  onChange,
  multiple = true,
}: ImageUploadTriggerProps) => {
  return (
    <label
      htmlFor={id}
      className="border-border hover:bg-accent/50 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors"
    >
      <Upload className="text-muted-foreground mb-2 h-8 w-8" />
      <p className="text-muted-foreground mb-1 text-sm">클릭하여 이미지 업로드</p>
      <p className="text-muted-foreground text-xs">PNG, JPG, WEBP (최대 5MB)</p>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        className="hidden"
        accept="image/*"
        multiple={multiple}
        onChange={onChange}
      />
    </label>
  );
};
