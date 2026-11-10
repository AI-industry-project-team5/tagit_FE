import type { AnalysisResult } from '@shared/types/analysis';

/**
 * 백엔드 연동 전 화면 개발용 mock 데이터
 * API 응답 형태는 백엔드와 합의 후 확정합니다.
 */
const MOCK_IMAGE_URL = 'https://placehold.co/800x600?text=sample';

export const MOCK_ANALYSIS_RESULTS: Record<string, AnalysisResult> = {
  safe: {
    analysisId: 'safe',
    status: 'completed',
    imageUrl: MOCK_IMAGE_URL,
    verdict: 'safe',
    holdReason: null,
    memoBox: { left: 0.55, top: 0.3, width: 0.25, height: 0.2 },
    ocrText: '당근이 11/10',
    suspicionPercent: 8,
    createdAt: '2026-11-10T12:00:00Z',
  },
  suspicious: {
    analysisId: 'suspicious',
    status: 'completed',
    imageUrl: MOCK_IMAGE_URL,
    verdict: 'suspicious',
    holdReason: null,
    memoBox: { left: 0.55, top: 0.3, width: 0.25, height: 0.2 },
    ocrText: '당근이 11/10',
    suspicionPercent: 52,
    createdAt: '2026-11-10T12:00:00Z',
  },
  danger: {
    analysisId: 'danger',
    status: 'completed',
    imageUrl: MOCK_IMAGE_URL,
    verdict: 'danger',
    holdReason: null,
    memoBox: { left: 0.55, top: 0.3, width: 0.25, height: 0.2 },
    ocrText: null,
    suspicionPercent: 91,
    createdAt: '2026-11-10T12:00:00Z',
  },
  hold: {
    analysisId: 'hold',
    status: 'completed',
    imageUrl: MOCK_IMAGE_URL,
    verdict: 'hold',
    holdReason: 'memo_not_found',
    memoBox: null,
    ocrText: null,
    suspicionPercent: null,
    createdAt: '2026-11-10T12:00:00Z',
  },
};
