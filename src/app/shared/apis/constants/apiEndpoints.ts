/**
 * 백엔드 API 엔드포인트
 * 백엔드와 API 명세를 합의하면 이 파일의 경로를 맞춰 수정합니다.
 */
export const API_ENDPOINT = {
  ANALYSIS: {
    /** 인증 사진 업로드 및 분석 요청 */
    CREATE: '/analyses',
    /** 분석 상태 및 결과 조회 */
    DETAIL: (analysisId: string) => `/analyses/${analysisId}`,
    /** 공유 링크 생성 */
    SHARE: (analysisId: string) => `/analyses/${analysisId}/share`,
  },
  SHARE: {
    /** 공유된 결과 조회 */
    DETAIL: (token: string) => `/shares/${token}`,
  },
  /** 관리자 API (명세서 v2 · Base URL /api/v1/admin, 배포 전) */
  ADMIN: {
    /** 대시보드 집계 (?period) */
    DASHBOARD: '/api/v1/admin/dashboard',
    /** 이미지 목록 (?category&period&q&sort&page&size) */
    IMAGES: '/api/v1/admin/images',
    /** 검증 결과 상세 */
    IMAGE_DETAIL: (jobId: string) => `/api/v1/admin/images/${jobId}`,
  },
};
