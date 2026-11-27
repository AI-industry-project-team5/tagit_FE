import type { AdminImageCategory } from '@routes/path';
import { ADMIN_IMAGE_CATEGORIES } from '@pages/admin/images/constants/imageList';

/** 경로의 :category 가 정해진 분류(ai, real)인지 확인합니다. */
export const isImageCategory = (
  value: string | undefined
): value is AdminImageCategory =>
  ADMIN_IMAGE_CATEGORIES.some((category) => category === value);
