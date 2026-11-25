import { useSearchParams } from 'react-router-dom';
import {
  DEFAULT_ADMIN_PERIOD,
  PERIOD_QUERY_KEY,
} from '@pages/admin/constants/period';
import { parsePeriod } from '@pages/admin/utils/period';
import type { AdminPeriod } from '@shared/types/admin';

/**
 * 기간 필터 (?period=) 읽기·쓰기
 * 다른 쿼리(?mock= 등)는 그대로 두고 period 만 바꿉니다.
 */
export const usePeriodParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const period = parsePeriod(searchParams.get(PERIOD_QUERY_KEY));

  const setPeriod = (next: AdminPeriod) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (next === DEFAULT_ADMIN_PERIOD) params.delete(PERIOD_QUERY_KEY);
        else params.set(PERIOD_QUERY_KEY, next);
        return params;
      },
      { replace: true }
    );
  };

  return { period, setPeriod };
};
