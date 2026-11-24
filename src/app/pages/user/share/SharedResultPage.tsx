import { useParams, useSearchParams } from 'react-router-dom';
import { MOCK_QUERY_KEY, parseMock } from '@shared/mocks/mockScenarios';
import NotFoundPage from '@pages/notFound/NotFoundPage';
import AiResultView from '@pages/user/result/components/AiResultView';
import SimilarResultView from '@pages/user/result/components/SimilarResultView';
import { useSharedResult } from '@pages/user/result/hooks/useResultQueries';
import { useStartFeature } from '@pages/user/result/hooks/useStartFeature';
import ShareMessageCard from '@pages/user/share/components/ShareMessageCard';
import SharedBanner from '@pages/user/share/components/SharedBanner';

const RESULT_MAIN_CLASS =
  'animate-fade-in mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-[24px] px-[24px] pt-[40px] pb-[80px] md:px-[60px] lg:px-[120px]';

/**
 * 5-A / 5-B 공유 결과 · S-a 만료된 링크 · S-b 없는 링크 (S-01 ~ S-04)
 * 읽기 전용 결과이며, 현재는 Mock 토큰으로 상태를 시뮬레이션합니다.
 */
const SharedResultPage = () => {
  const { token = '' } = useParams();
  const [searchParams] = useSearchParams();
  const mock = parseMock(searchParams.get(MOCK_QUERY_KEY));
  const { data } = useSharedResult(token, mock);
  const { restartWith } = useStartFeature();

  if (!data) {
    return null;
  }

  // S-b 없는 링크 = 404 화면과 동일
  if (data.kind === 'not-found') {
    return <NotFoundPage />;
  }

  if (data.kind === 'expired') {
    return (
      <main className="flex flex-1 animate-fade-in items-center justify-center bg-gradient-to-b from-page-top via-page-mid via-60% to-page-bottom px-[16px] py-[40px]">
        <ShareMessageCard kind="expired" onStart={() => restartWith('ai')} />
      </main>
    );
  }

  return (
    <main className={RESULT_MAIN_CLASS}>
      <SharedBanner expiresAt={data.expiresAt} />
      {data.kind === 'ai' ? (
        <AiResultView
          result={data.result}
          mode="shared"
          onRestart={() => restartWith('ai')}
        />
      ) : (
        <SimilarResultView
          result={data.result}
          mode="shared"
          onRestart={() => restartWith('similar')}
        />
      )}
    </main>
  );
};

export default SharedResultPage;
