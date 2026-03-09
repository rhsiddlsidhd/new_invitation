/**
 * 이미지 관련 순수 유틸리티 함수
 */

/**
 * 파일 객체로부터 브라우저 미리보기 URL을 생성합니다.
 */
export const createPreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * 생성된 미리보기 URL을 메모리에서 해제합니다.
 */
export const revokePreviewUrl = (url: string): void => {
  if (url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
};

/**
 * 파일 리스트를 DataTransfer 객체를 통해 Input Element와 동기화합니다.
 */
export const syncFilesWithInput = (
  input: HTMLInputElement | null,
  files: File[],
): void => {
  if (!input) return;

  const dataTransfer = new DataTransfer();
  files.forEach((file) => dataTransfer.items.add(file));
  input.files = dataTransfer.files;
};
