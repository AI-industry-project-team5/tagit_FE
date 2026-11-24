/** 업로드 가능한 이미지 조건 (U-01, U-06, U-07) */
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'] as const;
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export type ImageFileError = 'type' | 'size' | 'corrupt';

/** 형식·용량을 검사합니다. 문제가 없으면 null. */
export const validateImageFile = (file: File): ImageFileError | null => {
  if (!ACCEPTED_IMAGE_TYPES.some((type) => type === file.type)) {
    return 'type';
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return 'size';
  }
  return null;
};

/** 브라우저에서 실제로 열 수 있는 이미지인지 확인합니다 (U-09 손상 파일). */
export const canDecodeImage = (file: File) =>
  new Promise<boolean>((resolve) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    const finish = (result: boolean) => {
      URL.revokeObjectURL(url);
      resolve(result);
    };

    image.onload = () => finish(true);
    image.onerror = () => finish(false);
    image.src = url;
  });
