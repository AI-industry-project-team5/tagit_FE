import {
  ADMIN_PERIOD_OPTIONS,
  DEFAULT_ADMIN_PERIOD,
  PERIOD_QUERY_KEY,
} from '@pages/admin/constants/period';
import type { AdminPeriod } from '@shared/types/admin';

/** ?period= 값을 해석합니다. 알 수 없는 값은 기본값(최근 7일)으로 처리합니다. */
export const parsePeriod = (raw: string | null): AdminPeriod =>
  ADMIN_PERIOD_OPTIONS.find((option) => option.value === raw)?.value ??
  DEFAULT_ADMIN_PERIOD;

export const getPeriodLabel = (period: AdminPeriod) =>
  ADMIN_PERIOD_OPTIONS.find((option) => option.value === period)?.label ?? '';

/**
 * 다른 관리자 화면으로 이동할 때 기간을 이어 붙입니다.
 * 기본값이면 주소를 깔끔하게 두기 위해 생략합니다.
 */
export const withPeriod = (path: string, period: AdminPeriod) =>
  period === DEFAULT_ADMIN_PERIOD
    ? path
    : `${path}?${PERIOD_QUERY_KEY}=${period}`;
