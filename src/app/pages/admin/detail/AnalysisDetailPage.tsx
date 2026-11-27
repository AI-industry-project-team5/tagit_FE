import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { getAdminImagesPath } from '@routes/path';
import AdminStateCard from '@pages/admin/components/AdminStateCard';
import { useImageDetailQuery } from '@pages/admin/detail/apis/useImageDetailQuery';
import DetailHeader from '@pages/admin/detail/components/DetailHeader';
import DetailSkeleton from '@pages/admin/detail/components/DetailSkeleton';
import ModelResultCard from '@pages/admin/detail/components/ModelResultCard';
import { DETAIL_COPY } from '@pages/admin/detail/constants/detailCopy';
import type { DetailLocationState } from '@pages/admin/detail/types/detailView';
import { isNotFoundError } from '@pages/admin/detail/utils/apiError';
import imageIcon from '@shared/assets/icons/image.svg';
import AnalysisPhotoPanel from '@shared/components/result/AnalysisPhotoPanel';
import MemoTextCard from '@shared/components/result/MemoTextCard';
import MetadataCard from '@shared/components/result/MetadataCard';
import VerdictCard from '@shared/components/result/VerdictCard';
import { MOCK_QUERY_KEY } from '@shared/mocks/mockScenarios';
import { parseAdminMock } from '@shared/mocks/mockAdminApi';

/** AI 의심으로 분류하는 기준 (목록 분류와 같은 50%) */
const AI_CATEGORY_PERCENT = 50;

/**
 * A-03 검증 결과 상세 (AD-k 히트맵 생성 실패, AD-g 불러오기 실패 포함)
 * 사진·의심도·메모 글씨·메타데이터 카드는 사용자 결과 화면(4-A)과 같은
 * shared/components/result 공통 컴포넌트를 사용합니다.
 */
const AnalysisDetailPage = () => {
  const { analysisId = '' } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const scenario = parseAdminMock(searchParams.get(MOCK_QUERY_KEY));
  const { data, error, isPending, isError, isFetching, refetch } =
    useImageDetailQuery(analysisId, scenario);

  const listPath = getAdminImagesPath(
    data?.percent != null && data.percent < AI_CATEGORY_PERCENT ? 'real' : 'ai'
  );
  // 목록·대시보드에서 왔으면 보던 화면(탭·기간·검색·페이지)으로 돌아갑니다.
  const backPath =
    (location.state as DetailLocationState | null)?.from ?? listPath;

  const renderContent = () => {
    if (isPending || (isError && isFetching)) {
      return <DetailSkeleton />;
    }

    if (isError) {
      return isNotFoundError(error) ? (
        <AdminStateCard
          variant="empty"
          title={DETAIL_COPY.notFoundTitle}
          description={DETAIL_COPY.notFoundDescription}
        />
      ) : (
        <AdminStateCard
          title="데이터를 불러오지 못했어요"
          description="잠시 후 다시 시도해주세요"
          actionLabel="다시 불러오기"
          onAction={() => refetch()}
        />
      );
    }

    return (
      <div className="flex w-full animate-fade-in flex-col gap-[28px] xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-col gap-[16px] xl:w-[600px] xl:shrink-0">
          {data.imageUrl ? (
            <AnalysisPhotoPanel
              // 다른 분석으로 바뀌면 보기 방식(원본/히트맵)을 처음 상태로 되돌립니다.
              key={data.id}
              imageUrl={data.imageUrl}
              verdict={data.verdict}
              memoBox={data.memoBox}
              percent={data.percent}
              heatmapUrl={data.heatmapUrl}
              heatmapUnavailableMessage={DETAIL_COPY.heatmapFailed}
            />
          ) : (
            <div className="flex aspect-[600/470] w-full flex-col items-center justify-center gap-[8px] rounded-[24px] bg-placeholder-photo-bg">
              <img src={imageIcon} alt="" width={36} height={36} />
              <p className="text-[14px] leading-[1.45] font-medium text-neutral-text-sub">
                {DETAIL_COPY.photoDeleted}
              </p>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-[16px]">
          <VerdictCard verdict={data.verdict} percent={data.percent} />
          <ModelResultCard models={data.models} verdict={data.verdict} />
          <MemoTextCard text={data.ocrText} />
          <MetadataCard metadata={data.metadata} />
        </div>
      </div>
    );
  };

  return (
    <>
      <DetailHeader
        analysisId={data?.analysisId ?? null}
        completedAt={data?.completedAt ?? null}
        listPath={listPath}
        backPath={backPath}
      />
      {renderContent()}
    </>
  );
};

export default AnalysisDetailPage;
