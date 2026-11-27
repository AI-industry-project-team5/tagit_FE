import type { AdminImageCategory } from '@routes/path';
import type { AdminSelectOption } from '@pages/admin/components/AdminSelect';
import type {
  AdminImageCategoryParam,
  AdminImageSort,
} from '@shared/types/admin';

/** 한 페이지에 보여줄 이미지 수 (명세서 size 기본값) */
export const IMAGE_PAGE_SIZE = 8;

/** 목록 상태를 담는 쿼리 키 */
export const IMAGE_LIST_QUERY_KEY = {
  SEARCH: 'q',
  SORT: 'sort',
  PAGE: 'page',
} as const;

export const ADMIN_IMAGE_CATEGORIES: readonly AdminImageCategory[] = [
  'ai',
  'real',
];

/** 화면 경로(ai | real) → API category 값 */
export const CATEGORY_PARAM: Record<
  AdminImageCategory,
  AdminImageCategoryParam
> = {
  ai: 'ai_suspected',
  real: 'real_estimated',
};

export const CATEGORY_LABEL: Record<AdminImageCategory, string> = {
  ai: 'AI 생성·합성 의심',
  real: '실제 촬영 추정',
};

/** 화면에 노출하는 정렬 (오래된순은 사용하지 않음) */
export const IMAGE_SORT_OPTIONS: readonly AdminSelectOption<AdminImageSort>[] =
  [
    { value: 'ai_score_desc', label: '의심도 높은 순' },
    { value: 'ai_score_asc', label: '의심도 낮은 순' },
    { value: 'created_at_desc', label: '최신순' },
  ];

/** 탭별 기본 정렬: AI 의심은 높은 순, 실제 촬영 추정은 낮은 순 */
export const DEFAULT_IMAGE_SORT: Record<AdminImageCategory, AdminImageSort> = {
  ai: 'ai_score_desc',
  real: 'ai_score_asc',
};
