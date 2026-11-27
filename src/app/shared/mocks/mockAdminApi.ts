import {
  getDashboardMock,
  getEmptyDashboardMock,
  getImageDetailMock,
  getImageListMock,
} from '@shared/mocks/adminMockData';
import type {
  AdminDashboardResponse,
  AdminErrorResponse,
  AdminImageDetailResponse,
  AdminImageListParams,
  AdminImageListResponse,
  AdminPeriod,
} from '@shared/types/admin';

/**
 * 관리자 화면용 Mock API
 * 백엔드 API 가 준비되면 이 모듈의 함수들을 axiosInstance + API_ENDPOINT.ADMIN 호출로 교체합니다.
 *
 * ?mock=<값> 으로 상태를 바꿔 볼 수 있습니다. (관리자 UI 에는 노출하지 않음)
 * - error : 불러오기 실패 (AD-g)
 * - empty : 분석된 사진이 없음 (AD-d)
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

/** 실제 API 오류(axios)와 같은 모양: error.response.status / error.response.data */
export class MockAdminApiError extends Error {
  response: { status: number; data: AdminErrorResponse };

  constructor(status: number, data: AdminErrorResponse) {
    super(data.message);
    this.name = 'MockAdminApiError';
    this.response = { status, data };
  }
}

const simulate = async (scenario: AdminMockScenario) => {
  await wait(scenario === 'slow' ? SLOW_LATENCY_MS : MOCK_LATENCY_MS);

  if (scenario === 'error') {
    throw new Error('mock: admin request failed');
  }
};

/** GET /dashboard */
export const fetchDashboardSummary = async (
  period: AdminPeriod,
  scenario: AdminMockScenario
): Promise<AdminDashboardResponse> => {
  await simulate(scenario);
  return scenario === 'empty'
    ? getEmptyDashboardMock(period)
    : getDashboardMock(period);
};

/** GET /images */
export const fetchImageList = async (
  params: AdminImageListParams,
  scenario: AdminMockScenario
): Promise<AdminImageListResponse> => {
  await simulate(scenario);
  return getImageListMock(params, scenario === 'empty');
};

/** GET /images/{id} — 없는 분석 번호면 404 JOB_NOT_FOUND */
export const fetchImageDetail = async (
  imageId: string,
  scenario: AdminMockScenario
): Promise<AdminImageDetailResponse> => {
  await simulate(scenario);

  const detail = getImageDetailMock(imageId);
  if (!detail) {
    throw new MockAdminApiError(404, {
      error_code: 'JOB_NOT_FOUND',
      message: '분석 결과를 찾을 수 없습니다.',
    });
  }
  return detail;
};
