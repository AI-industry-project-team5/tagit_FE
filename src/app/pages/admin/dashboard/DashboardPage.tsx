import { useSearchParams } from 'react-router-dom';
import { MOCK_QUERY_KEY } from '@shared/mocks/mockScenarios';
import { parseAdminMock } from '@shared/mocks/mockAdminApi';
import AdminPageHeader from '@pages/admin/components/AdminPageHeader';
import AdminStateCard from '@pages/admin/components/AdminStateCard';
import PeriodSelect from '@pages/admin/components/PeriodSelect';
import { usePeriodParam } from '@pages/admin/hooks/usePeriodParam';
import { useDashboardQuery } from '@pages/admin/dashboard/apis/useDashboardQuery';
import DashboardSkeleton from '@pages/admin/dashboard/components/DashboardSkeleton';
import RatioCard from '@pages/admin/dashboard/components/RatioCard';
import RecentImagesCard from '@pages/admin/dashboard/components/RecentImagesCard';

/** A-01 관리자 대시보드 (AD-g 불러오기 실패 포함) */
const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const { period, setPeriod } = usePeriodParam();
  const scenario = parseAdminMock(searchParams.get(MOCK_QUERY_KEY));
  const { data, isPending, isError, isFetching, refetch } = useDashboardQuery(
    period,
    scenario
  );

  const renderContent = () => {
    // 처음 불러올 때, 또는 실패 후 다시 불러오는 중
    if (isPending || (isError && isFetching)) {
      return <DashboardSkeleton />;
    }

    if (isError) {
      return (
        <AdminStateCard
          title="데이터를 불러오지 못했어요"
          description="잠시 후 다시 시도해주세요"
          actionLabel="다시 불러오기"
          onAction={() => refetch()}
        />
      );
    }

    return (
      <div className="flex w-full animate-fade-in flex-col gap-[24px]">
        <RatioCard
          totalCount={data.totalCount}
          aiCount={data.aiCount}
          realCount={data.realCount}
        />
        <div className="flex w-full flex-col gap-[16px] lg:flex-row">
          <RecentImagesCard
            title="최근 AI 의심 이미지"
            category="ai"
            images={data.recentAiImages}
            period={period}
          />
          <RecentImagesCard
            title="최근 실제 촬영 이미지"
            category="real"
            images={data.recentRealImages}
            period={period}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <AdminPageHeader
        title="대시보드"
        description="서비스 이용 현황과 AI 분석 결과를 한눈에 확인해요"
        actions={<PeriodSelect value={period} onChange={setPeriod} />}
      />
      {renderContent()}
    </>
  );
};

export default DashboardPage;
