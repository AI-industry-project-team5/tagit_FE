import type { Feature } from '@shared/types/feature';
import type {
  AiCheckResult,
  ShareLinkInfo,
  SimilarSearchResult,
} from '@shared/types/userResult';
import {
  getAiMockResult,
  getSimilarMockResult,
} from '@shared/mocks/userMockData';
import type {
  AiScenario,
  MockSetting,
  SimilarScenario,
} from '@shared/mocks/mockScenarios';

/**
 * 사용자 화면용 Mock API
 * 백엔드 API 명세가 확정되면 이 모듈의 함수들을 실제 호출로 교체합니다.
 * (엔드포인트·응답 스키마는 아직 확정되지 않았으므로 여기서 정하지 않습니다.)
 * 실제 분석·검색·공유가 동작하는 것이 아니라 화면 확인용 시뮬레이션입니다.
 */

const MOCK_LATENCY_MS = 150;

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/** 분석(또는 검색) 요청 — 실제로는 업로드한 사진을 서버에 보냅니다. */
export const requestAnalysis = async (feature: Feature) => {
  await wait(MOCK_LATENCY_MS);
  return { analysisId: `mock-${feature}-${Date.now().toString(36)}` };
};

export const fetchAiCheckResult = async (
  analysisId: string,
  scenario: AiScenario
): Promise<AiCheckResult> => {
  await wait(MOCK_LATENCY_MS);
  return getAiMockResult(analysisId, scenario);
};

export const fetchSimilarResult = async (
  analysisId: string,
  scenario: SimilarScenario
): Promise<SimilarSearchResult> => {
  await wait(MOCK_LATENCY_MS);
  return getSimilarMockResult(analysisId, scenario);
};

/** 공유 링크 발급 (유효기간 7일) */
export const createShareLink = async (
  feature: Feature,
  setting: MockSetting
): Promise<ShareLinkInfo> => {
  await wait(MOCK_LATENCY_MS);

  if (setting.shareFail) {
    throw new Error('mock: share link creation failed');
  }

  return {
    token: feature === 'ai' ? DEMO_TOKEN.ai : DEMO_TOKEN.similar,
    expiresAt: feature === 'ai' ? DEMO_EXPIRES_AT.ai : DEMO_EXPIRES_AT.similar,
  };
};

/** Mock 공유 토큰 (이 외의 토큰은 "없는 링크"로 처리) */
export const DEMO_TOKEN = {
  ai: 'demo-ai',
  similar: 'demo-similar',
  expired: 'demo-expired',
} as const;

const DEMO_EXPIRES_AT = {
  ai: '2026-11-27T23:59:59',
  similar: '2026-11-29T23:59:59',
} as const;

export type SharedResult =
  | { kind: 'ai'; result: AiCheckResult; expiresAt: string }
  | { kind: 'similar'; result: SimilarSearchResult; expiresAt: string }
  | { kind: 'expired' }
  | { kind: 'not-found' };

/** 공유 결과 조회 */
export const fetchSharedResult = async (
  token: string,
  setting: MockSetting
): Promise<SharedResult> => {
  await wait(MOCK_LATENCY_MS);

  switch (token) {
    case DEMO_TOKEN.ai:
      return {
        kind: 'ai',
        result: getAiMockResult(token, setting.aiScenario),
        expiresAt: DEMO_EXPIRES_AT.ai,
      };
    case DEMO_TOKEN.similar:
      return {
        kind: 'similar',
        result: getSimilarMockResult(token, setting.similarScenario),
        expiresAt: DEMO_EXPIRES_AT.similar,
      };
    case DEMO_TOKEN.expired:
      return { kind: 'expired' };
    default:
      return { kind: 'not-found' };
  }
};
