import { useQuery } from '@tanstack/react-query';
import {
  fetchAiCheckResult,
  fetchSharedResult,
  fetchSimilarResult,
} from '@shared/mocks/mockUserApi';
import type {
  AiScenario,
  MockSetting,
  SimilarScenario,
} from '@shared/mocks/mockScenarios';

/**
 * 결과 조회 훅
 * 현재는 Mock API 를 호출합니다. API 연동 시 queryFn 만 실제 호출로 교체하면 됩니다.
 */

export const useAiCheckResult = (analysisId: string, scenario: AiScenario) =>
  useQuery({
    queryKey: ['user', 'ai-result', analysisId, scenario],
    queryFn: () => fetchAiCheckResult(analysisId, scenario),
  });

export const useSimilarResult = (
  analysisId: string,
  scenario: SimilarScenario
) =>
  useQuery({
    queryKey: ['user', 'similar-result', analysisId, scenario],
    queryFn: () => fetchSimilarResult(analysisId, scenario),
  });

export const useSharedResult = (token: string, setting: MockSetting) =>
  useQuery({
    queryKey: [
      'user',
      'shared-result',
      token,
      setting.aiScenario,
      setting.similarScenario,
    ],
    queryFn: () => fetchSharedResult(token, setting),
  });
