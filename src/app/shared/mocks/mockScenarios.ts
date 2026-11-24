/**
 * Mock 시나리오 선택
 * 백엔드 연동 전 화면 확인용으로, URL 의 ?mock=<값> 으로 시나리오를 고릅니다.
 * 실제 사용자 UI 에는 노출하지 않으며, 값이 없으면 기본 시나리오로 동작합니다.
 */

export const MOCK_QUERY_KEY = 'mock';

/** 기능 1 결과 시나리오 */
export const AI_SCENARIOS = [
  'danger',
  'suspicious',
  'safe',
  'hold-memo',
  'hold-quality',
  'ocr-fail',
  'heatmap-fail',
] as const;

export type AiScenario = (typeof AI_SCENARIOS)[number];

/** 기능 2 결과 시나리오 */
export const SIMILAR_SCENARIOS = [
  'exact',
  'similar-only',
  'none',
  'failed',
] as const;

export type SimilarScenario = (typeof SIMILAR_SCENARIOS)[number];

/** 분석 진행 중 흐름 시나리오 (slow: 응답 지연, error: 분석 오류) */
export type MockFlow = 'normal' | 'slow' | 'error';

export interface MockSetting {
  aiScenario: AiScenario;
  similarScenario: SimilarScenario;
  flow: MockFlow;
  /** 공유 링크 생성 실패 재현 */
  shareFail: boolean;
}

export const DEFAULT_AI_SCENARIO: AiScenario = 'danger';
export const DEFAULT_SIMILAR_SCENARIO: SimilarScenario = 'exact';

const findScenario = <T extends string>(
  list: readonly T[],
  value: string | null
): T | null => list.find((item) => item === value) ?? null;

/** ?mock= 값을 해석합니다. 알 수 없는 값은 기본 시나리오로 처리합니다. */
export const parseMock = (raw: string | null): MockSetting => ({
  aiScenario: findScenario(AI_SCENARIOS, raw) ?? DEFAULT_AI_SCENARIO,
  similarScenario:
    findScenario(SIMILAR_SCENARIOS, raw) ?? DEFAULT_SIMILAR_SCENARIO,
  flow: raw === 'slow' ? 'slow' : raw === 'error' ? 'error' : 'normal',
  shareFail: raw === 'share-fail',
});

/** mock 값을 다음 화면으로 이어 붙이기 위한 쿼리 문자열 */
export const withMockQuery = (path: string, raw: string | null) =>
  raw ? `${path}?${MOCK_QUERY_KEY}=${encodeURIComponent(raw)}` : path;
