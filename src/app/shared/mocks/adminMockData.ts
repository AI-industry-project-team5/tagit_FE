import photoUrl from '@shared/assets/mock/photo.svg';
import type {
  AdminImageSummary,
  AdminPeriod,
  DashboardSummary,
} from '@shared/types/admin';

/**
 * 관리자 화면 확인용 Mock 데이터
 * UI 컴포넌트는 이 파일을 직접 import 하지 않고, mockAdminApi 를 거쳐
 * 페이지(훅)에서만 주입받습니다. API 연동 시 이 파일들만 교체합니다.
 */

/** 기간별 집계 (최근 7일은 Figma A-01 수치) */
const COUNTS: Record<AdminPeriod, { total: number; ai: number }> = {
  today: { total: 128, ai: 21 },
  '7d': { total: 3927, ai: 612 },
  all: { total: 12480, ai: 1873 },
};

const BASE_TIME = new Date('2026-11-20T14:10:00+09:00').getTime();
const MINUTE = 60 * 1000;

const createImages = (
  startNumber: number,
  percents: number[]
): AdminImageSummary[] =>
  percents.map((percent, index) => ({
    analysisId: `A-${startNumber - index}`,
    imageUrl: photoUrl,
    suspicionPercent: percent,
    analyzedAt: new Date(BASE_TIME - index * 47 * MINUTE).toISOString(),
  }));

export const getDashboardMock = (period: AdminPeriod): DashboardSummary => {
  const { total, ai } = COUNTS[period];
  return {
    totalCount: total,
    aiCount: ai,
    realCount: total - ai,
    recentAiImages: createImages(3921, [92, 87, 81, 76]),
    recentRealImages: createImages(3913, [6, 9, 12, 15]),
  };
};

/** 분석된 사진이 하나도 없는 경우 */
export const EMPTY_DASHBOARD_MOCK: DashboardSummary = {
  totalCount: 0,
  aiCount: 0,
  realCount: 0,
  recentAiImages: [],
  recentRealImages: [],
};
