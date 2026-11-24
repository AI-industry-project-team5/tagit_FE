import { useState } from 'react';
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useUserPhoto } from '@shared/hooks/useUserPhoto';
import {
  MOCK_QUERY_KEY,
  parseMock,
  withMockQuery,
} from '@shared/mocks/mockScenarios';
import { isFeature } from '@shared/types/feature';
import type { Feature } from '@shared/types/feature';
import AnalysisErrorCard from '@pages/user/analyzing/components/AnalysisErrorCard';
import AnalysisProgressCard from '@pages/user/analyzing/components/AnalysisProgressCard';
import { useAnalysisProgress } from '@pages/user/analyzing/hooks/useAnalysisProgress';
import { getResultPath, paths } from '@routes/path';

interface AnalyzingScreenProps {
  feature: Feature;
  analysisId: string;
  mockRaw: string | null;
  /** 다시 시도 후에는 지연·오류 없이 정상 흐름으로 진행 (Mock) */
  recovered: boolean;
  onRetry: () => void;
}

/** 3-A 분석 중 / 3-B 찾는 중 / A-a 응답 지연 / A-b 분석 오류 */
const AnalyzingScreen = ({
  feature,
  analysisId,
  mockRaw,
  recovered,
  onRetry,
}: AnalyzingScreenProps) => {
  const navigate = useNavigate();
  const { photo } = useUserPhoto();
  const flow = recovered ? 'normal' : parseMock(mockRaw).flow;

  const { stage, slow, failed } = useAnalysisProgress({
    flow,
    // A-05 · 완료되면 해당 기능의 결과 화면으로 자동 이동
    onComplete: () =>
      navigate(withMockQuery(getResultPath(feature, analysisId), mockRaw), {
        replace: true,
      }),
  });

  return (
    <main className="flex flex-1 animate-fade-in items-center justify-center px-[16px] pb-[40px]">
      {failed ? (
        <AnalysisErrorCard
          onRetry={onRetry}
          onHome={() => navigate(paths.upload)}
        />
      ) : (
        <AnalysisProgressCard
          feature={feature}
          stage={stage}
          photoUrl={photo?.previewUrl ?? null}
          slow={slow}
          onRetry={onRetry}
        />
      )}
    </main>
  );
};

const AnalyzingPage = () => {
  const { feature, analysisId } = useParams();
  const [searchParams] = useSearchParams();
  const [attempt, setAttempt] = useState(0);

  if (!isFeature(feature) || !analysisId) {
    return <Navigate to={paths.upload} replace />;
  }

  return (
    <AnalyzingScreen
      // 다시 시도하면 화면을 새로 시작합니다.
      key={attempt}
      feature={feature}
      analysisId={analysisId}
      mockRaw={searchParams.get(MOCK_QUERY_KEY)}
      recovered={attempt > 0}
      onRetry={() => setAttempt((count) => count + 1)}
    />
  );
};

export default AnalyzingPage;
