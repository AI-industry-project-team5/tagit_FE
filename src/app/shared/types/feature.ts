/**
 * 사용자 기능 구분
 * - ai: 기능 1 · AI 합성 의심도 확인
 * - similar: 기능 2 · 비슷한 이미지 찾기
 * 두 기능은 독립적이며 URL(feature 파라미터)로 구분합니다.
 */
export const FEATURES = ['ai', 'similar'] as const;

export type Feature = (typeof FEATURES)[number];

export const isFeature = (value: string | undefined): value is Feature =>
  FEATURES.some((feature) => feature === value);
