import {
  EMPTY_DASHBOARD_MOCK,
  getDashboardMock,
} from '@shared/mocks/adminMockData';
import type { AdminPeriod, DashboardSummary } from '@shared/types/admin';

/**
 * 관리자 화면용 Mock API
 * 백엔드 API 가 준비되면 이 모듈의 함수들을 axiosInstance + API_ENDPOINT.ADMIN 호출로 교체합니다.
 *
 * ?mock=<값> 으로 상태를 바꿔 볼 수 있습니다. (관리자 UI 에는 노출하지 않음)
 * - error : 불러오기 실패 (AD-g)
 * - empty : 분석된 사진이 없음
 * - slow  : 응답 지연 (로딩 스켈레톤 확인용)
 */
export type AdminMockScenario = 'normal' | 'error' | 'empty' | 'slow';

const ADMIN_MOCK_SCENARIOS: readonly AdminMockScenario[] = [
  'error',
  'empty',
  'slow',
];

export const parseAdminMock = (raw: string | null): AdminMockScenario =>
  ADMIN_MOCK_SCENARIOS.find((scenario) => scenario === raw) ?? 'normal';

const MOCK_LATENCY_MS = 300;
const SLOW_LATENCY_MS = 2500;

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const fetchDashboardSummary = async (
  period: AdminPeriod,
  scenario: AdminMockScenario
): Promise<DashboardSummary> => {
  await wait(scenario === 'slow' ? SLOW_LATENCY_MS : MOCK_LATENCY_MS);

  if (scenario === 'error') {
    throw new Error('mock: dashboard load failed');
  }
  return scenario === 'empty' ? EMPTY_DASHBOARD_MOCK : getDashboardMock(period);
};
