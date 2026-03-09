import { useState, useEffect, useRef } from "react";
import { createPreviewUrl, revokePreviewUrl, syncFilesWithInput } from "@/utils/image";

export interface ImageFileState {
  type: "existing" | "new";
  id: string;
  preview: string;
  file?: File;
  originalUrl?: string;
}

/**
 * ImageField의 상태 관리와 파일 핸들링 로직을 담당하는 훅
 */
export function useImageField(defaultImages: string[] = []) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<ImageFileState[]>([]);

  // 1. 초기 이미지 데이터 설정 (Initialization)
  useEffect(() => {
    if (defaultImages.length > 0) {
      const initialImages: ImageFileState[] = defaultImages.map((url, index) => ({
        type: "existing",
        id: `existing-${index}-${Date.now()}`,
        preview: url,
        originalUrl: url,
      }));
      setFileList(initialImages);
    }
    
    // Cleanup: 컴포넌트 언마운트 시 모든 ObjectURL 해제
    return () => {
      fileList.forEach((img) => {
        if (img.type === "new") {
          revokePreviewUrl(img.preview);
        }
      });
    };
  }, [defaultImages]);

  // 2. 파일 선택 핸들러 (Add)
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length === 0) return;

    const newImageItems: ImageFileState[] = newFiles.map((file: File) => ({
      type: "new" as const,
      id: crypto.randomUUID(),
      preview: createPreviewUrl(file),
      file,
    }));

    setFileList((prev) => [...prev, ...newImageItems]);
  };

  // 3. 이미지 삭제 핸들러 (Remove)
  const removeImage = (imageId: string) => {
    setFileList((prev) => {
      const target = prev.find((img) => img.id === imageId);
      if (target?.type === "new") {
        revokePreviewUrl(target.preview);
      }
      return prev.filter((img) => img.id !== imageId);
    });
  };

  // 4. React 상태와 input.files 동기화 (Sync)
  useEffect(() => {
    const newFiles = fileList
      .filter((img) => img.type === "new" && img.file)
      .map((img) => img.file!);

    syncFilesWithInput(inputRef.current, newFiles);
  }, [fileList]);

  // 5. 서버 전송용 데이터 추출 (Compute)
  const existingUrls = fileList
    .filter((img) => img.type === "existing")
    .map((img) => img.originalUrl);

  return {
    fileList,
    onFileChange,
    removeImage,
    inputRef,
    existingUrls,
  };
}
