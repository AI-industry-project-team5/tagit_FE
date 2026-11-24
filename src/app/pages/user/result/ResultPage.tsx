import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import Toast from '@shared/components/ui/Toast';
import { useToast } from '@shared/hooks/useToast';
import { useUserPhoto } from '@shared/hooks/useUserPhoto';
import { MOCK_QUERY_KEY, parseMock } from '@shared/mocks/mockScenarios';
import { isFeature } from '@shared/types/feature';
import AiResultView from '@pages/user/result/components/AiResultView';
import SimilarResultView from '@pages/user/result/components/SimilarResultView';
import {
  useAiCheckResult,
  useSimilarResult,
} from '@pages/user/result/hooks/useResultQueries';
import { useShareLink } from '@pages/user/result/hooks/useShareLink';
import { useStartFeature } from '@pages/user/result/hooks/useStartFeature';
import { paths } from '@routes/path';

const RESULT_MAIN_CLASS =
  'animate-fade-in mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-[24px] px-[24px] pt-[40px] pb-[80px] md:px-[60px] lg:px-[120px]';

interface ResultScreenProps {
  analysisId: string;
  mockRaw: string | null;
}

/** 4-A 검증 결과 (기능 1) — 위험·의심·안전·판단 보류와 각 예외 상태 */
const AiResultScreen = ({ analysisId, mockRaw }: ResultScreenProps) => {
  const mock = parseMock(mockRaw);
  const { data: result } = useAiCheckResult(analysisId, mock.aiScenario);
  const { toast, showToast } = useToast();
  const { share, sharing } = useShareLink(
    'ai',
    mock,
    mock.aiScenario,
    showToast
  );
  const { startFeature, restartWith } = useStartFeature();

  if (!result) {
    return null;
  }

  return (
    <>
      <main className={RESULT_MAIN_CLASS}>
        <AiResultView
          result={result}
          mode="owner"
          sharing={sharing}
          onShare={share}
          onRestart={() => restartWith('ai')}
          onFindSimilar={() => startFeature('similar')}
        />
      </main>
      <Toast toast={toast} />
    </>
  );
};

/** 4-B 비슷한 이미지 결과 (기능 2) — 똑같은 사진·비슷한 사진·결과 없음·검색 실패 */
const SimilarResultScreen = ({ analysisId, mockRaw }: ResultScreenProps) => {
  const mock = parseMock(mockRaw);
  const { data: result } = useSimilarResult(analysisId, mock.similarScenario);
  const { toast, showToast } = useToast();
  const { share, sharing } = useShareLink(
    'similar',
    mock,
    mock.similarScenario,
    showToast
  );
  const { startFeature, restartWith } = useStartFeature();
  const { photo } = useUserPhoto();

  if (!result) {
    return null;
  }

  return (
    <>
      <main className={RESULT_MAIN_CLASS}>
        <SimilarResultView
          // 내가 올린 사진이 있으면 그 사진을, 없으면 Mock 사진을 보여줍니다.
          result={{ ...result, imageUrl: photo?.previewUrl ?? result.imageUrl }}
          mode="owner"
          sharing={sharing}
          onShare={share}
          onRestart={() => restartWith('similar')}
          onCheckAi={() => startFeature('ai')}
          onRetrySearch={() => startFeature('similar')}
        />
      </main>
      <Toast toast={toast} />
    </>
  );
};

const ResultPage = () => {
  const { feature, analysisId } = useParams();
  const [searchParams] = useSearchParams();

  if (!isFeature(feature) || !analysisId) {
    return <Navigate to={paths.upload} replace />;
  }

  const mockRaw = searchParams.get(MOCK_QUERY_KEY);

  return feature === 'ai' ? (
    <AiResultScreen analysisId={analysisId} mockRaw={mockRaw} />
  ) : (
    <SimilarResultScreen analysisId={analysisId} mockRaw={mockRaw} />
  );
};

export default ResultPage;
