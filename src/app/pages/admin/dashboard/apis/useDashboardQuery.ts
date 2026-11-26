import { useQuery } from '@tanstack/react-query';
import { fetchDashboardSummary } from '@shared/mocks/mockAdminApi';
import type { AdminMockScenario } from '@shared/mocks/mockAdminApi';
import type { AdminPeriod } from '@shared/types/admin';

/**
 * 대시보드 집계 조회
 * 현재는 Mock API 를 호출합니다. API 연동 시 queryFn 만
 * axiosInstance.get(API_ENDPOINT.ADMIN.DASHBOARD, { params: { period } }) 로 교체합니다.
 */
export const useDashboardQuery = (
  period: AdminPeriod,
  scenario: AdminMockScenario
) =>
  useQuery({
    queryKey: ['admin', 'dashboard', period, scenario],
    queryFn: () => fetchDashboardSummary(period, scenario),
  });
