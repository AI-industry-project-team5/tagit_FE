/**
 * 관리자 API 타입 (API 명세서 v2 · 관리자 페이지 기준)
 * 응답 필드는 서버 형식(snake_case) 그대로 둡니다.
 * 백엔드 배포 전이라 값이 바뀌면 이 파일의 속성명만 맞춰 수정합니다.
 */

/**
 * 기간 필터: 오늘 / 최근 7일 / 전체
 * 명세서 v2 는 7d | 30d | all 이지만 today 추가를 백엔드에 요청한 상태입니다.
 */
export type AdminPeriod = 'today' | '7d' | 'all';

/** 이미지 분류 (API category 값) */
export type AdminImageCategoryParam = 'ai_suspected' | 'real_estimated';

/** 정렬 (API sort 값) */
export type AdminImageSort =
  'ai_score_desc' | 'ai_score_asc' | 'created_at_desc' | 'created_at_asc';

/**
 * 편집 기록 상태
 * NONE(메타데이터 없음)은 백엔드에서 추가하기로 한 값입니다.
 */
export type AdminEditStatus = 'EDITED' | 'NOT_EDITED' | 'UNKNOWN' | 'NONE';

/** 글씨 인식(OCR) 상태 */
export type AdminOcrStatus = 'COMPLETED' | 'NO_TEXT' | 'FAILED' | 'SKIPPED';

/** 최근 이미지 한 장 (대시보드) */
export interface AdminRecentImage {
  /** 분석 번호 (화면에는 #A-{id}) */
  id: number;
  job_id: string;
  /** 삭제된 이미지는 null */
  thumbnail_url: string | null;
  /** AI 생성·합성 확률 0~1, 판단 불가면 null */
  probability: number | null;
}

/** GET /dashboard 응답 */
export interface AdminDashboardResponse {
  period: AdminPeriod;
  summary: {
    total_count: number;
    ai_suspected_count: number;
    /** AI 의심 비율 0~1 */
    ai_suspected_ratio: number;
    real_estimated_count: number;
    /** 실제 촬영 추정 비율 0~1 */
    real_estimated_ratio: number;
  };
  recent_ai_suspected: AdminRecentImage[];
  recent_real_estimated: AdminRecentImage[];
}

/** GET /images 요청 파라미터 */
export interface AdminImageListParams {
  category: AdminImageCategoryParam;
  period: AdminPeriod;
  /** 분석 번호 검색 ('#A-3921', 'A-3921', '3921') */
  q?: string;
  sort: AdminImageSort;
  /** 1부터 시작 */
  page: number;
  size: number;
}

/** 이미지 목록 한 장 */
export interface AdminImageItem extends AdminRecentImage {
  edit_status: AdminEditStatus;
  ocr_status: AdminOcrStatus;
  /** 분석 완료 시각 (UTC, ISO 8601) */
  completed_at: string;
}

/** GET /images 응답 */
export interface AdminImageListResponse {
  period: AdminPeriod;
  category: AdminImageCategoryParam;
  counts: {
    total_count: number;
    ai_suspected_count: number;
    real_estimated_count: number;
    /** 전체 중 현재 분류 비율 0~1 */
    category_ratio: number;
  };
  pagination: {
    page: number;
    size: number;
    total_items: number;
    total_pages: number;
  };
  items: AdminImageItem[];
}
