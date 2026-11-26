import type { AdminPeriod } from '@shared/types/admin';

/** 기간 필터를 담는 쿼리 키 (?period=) — 대시보드·이미지 목록이 함께 사용 */
export const PERIOD_QUERY_KEY = 'period';

export const DEFAULT_ADMIN_PERIOD: AdminPeriod = '7d';

export const ADMIN_PERIOD_OPTIONS: readonly {
  value: AdminPeriod;
  label: string;
}[] = [
  { value: 'today', label: '오늘' },
  { value: '7d', label: '최근 7일' },
  { value: 'all', label: '전체' },
];
