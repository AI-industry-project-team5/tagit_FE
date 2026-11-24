/**
 * 라우트 경로 상수
 * - 사용자 화면은 /user/*, 관리자 화면은 /admin/* 로 분리합니다.
 * - 관리자 경로는 관리자 담당자가 adminRoutes.tsx 와 함께 추가합니다.
 */
export const paths = {
  /** 루트 (/user 로 리다이렉트) */
  root: '/',
  /** 사용자 영역 루트 */
  userRoot: '/user',
  /** 메인 · 사진 업로드 (기능 선택 포함) */
  upload: '/user',
  /** 분석 진행 상태 (기능 1·2 공통, feature 로 구분) */
  analyzing: '/user/analyzing/:feature/:analysisId',
  /** 결과 (기능 1·2, feature 로 구분) */
  result: '/user/result/:feature/:analysisId',
  /** 공유된 결과 (읽기 전용) */
  share: '/user/share/:token',
  /** 관리자 영역 루트 (/admin/dashboard 로 리다이렉트) */
  adminRoot: '/admin',
  /** 관리자 로그인 */
  adminLogin: '/admin/login',
  /** 관리자 대시보드 */
  adminDashboard: '/admin/dashboard',
  /** 이미지 목록 (category: ai | real) */
  adminImages: '/admin/images/:category',
  /** 검증 결과 상세 */
  adminDetail: '/admin/analyses/:analysisId',
} as const;

export const getAnalyzingPath = (feature: string, analysisId: string) =>
  `/user/analyzing/${feature}/${analysisId}`;

export const getResultPath = (feature: string, analysisId: string) =>
  `/user/result/${feature}/${analysisId}`;

export const getSharePath = (token: string) => `/user/share/${token}`;

/** 관리자 이미지 목록 분류: AI 생성·합성 의심 / 실제 촬영 추정 */
export type AdminImageCategory = 'ai' | 'real';

export const getAdminImagesPath = (category: AdminImageCategory) =>
  `/admin/images/${category}`;

export const getAdminDetailPath = (analysisId: string) =>
  `/admin/analyses/${analysisId}`;
