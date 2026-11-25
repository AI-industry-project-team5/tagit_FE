/** 관리자 화면 기간 필터: 오늘 / 최근 7일 / 전체 */
export type AdminPeriod = 'today' | '7d' | 'all';

/** 관리자 화면에 표시하는 분석 이미지 한 장 */
export interface AdminImageSummary {
  analysisId: string;
  imageUrl: string;
  /** AI 합성 의심 확률 (0~100) */
  suspicionPercent: number;
  /** 분석 시각 (ISO) */
  analyzedAt: string;
}

/**
 * 대시보드 응답 (백엔드와 합의 전 초안)
 * 기능 1(AI 합성 의심도 확인)로 분석한 사진만 집계합니다.
 */
export interface DashboardSummary {
  /** 총 사진 수 */
  totalCount: number;
  /** AI 생성·합성 의심 */
  aiCount: number;
  /** 실제 촬영 추정 */
  realCount: number;
  /** 최근 AI 의심 이미지 (최대 4장) */
  recentAiImages: AdminImageSummary[];
  /** 최근 실제 촬영 이미지 (최대 4장) */
  recentRealImages: AdminImageSummary[];
}
