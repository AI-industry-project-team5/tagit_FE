import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { AdminImageCategory } from '@routes/path';
import { MOCK_QUERY_KEY } from '@shared/mocks/mockScenarios';
import { parseAdminMock } from '@shared/mocks/mockAdminApi';
import AdminPageHeader from '@pages/admin/components/AdminPageHeader';
import AdminSelect from '@pages/admin/components/AdminSelect';
import AdminStateCard from '@pages/admin/components/AdminStateCard';
import PeriodSelect from '@pages/admin/components/PeriodSelect';
import { useImageListQuery } from '@pages/admin/images/apis/useImageListQuery';
import CategoryTabs from '@pages/admin/images/components/CategoryTabs';
import ImageCard from '@pages/admin/images/components/ImageCard';
import ImageListSkeleton from '@pages/admin/images/components/ImageListSkeleton';
import ImageSearch from '@pages/admin/images/components/ImageSearch';
import Pagination from '@pages/admin/images/components/Pagination';
import {
  CATEGORY_PARAM,
  IMAGE_PAGE_SIZE,
  IMAGE_SORT_OPTIONS,
} from '@pages/admin/images/constants/imageList';
import { useImageListParams } from '@pages/admin/images/hooks/useImageListParams';
import { formatCount, formatRatio } from '@pages/admin/utils/format';

interface ImageListContentProps {
  category: AdminImageCategory;
}

/** A-02 이미지 목록 (AD-d 빈 기간, AD-g 불러오기 실패, AD-h 검색 결과 없음 포함) */
const ImageListContent = ({ category }: ImageListContentProps) => {
  const [searchParams] = useSearchParams();
  const scenario = parseAdminMock(searchParams.get(MOCK_QUERY_KEY));
  const { period, search, sort, page, setPeriod, setSearch, setSort, setPage } =
    useImageListParams(category);

  const categoryParam = CATEGORY_PARAM[category];
  const { data, isPending, isError, isFetching, isPlaceholderData, refetch } =
    useImageListQuery(
      {
        category: categoryParam,
        period,
        q: search || undefined,
        sort,
        page,
        size: IMAGE_PAGE_SIZE,
      },
      scenario
    );

  // 탭을 옮긴 직후에는 이전 탭 목록을 보여주지 않습니다.
  const isOtherCategory = data !== undefined && data.category !== categoryParam;
  const totalPages = data?.pagination.total_pages ?? 0;

  // 없는 페이지로 들어오면 마지막 페이지로 옮깁니다.
  useEffect(() => {
    if (!isPlaceholderData && totalPages > 0 && page > totalPages) {
      setPage(totalPages, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setPage 는 매 렌더 새로 만들어집니다.
  }, [isPlaceholderData, totalPages, page]);

  const handlePageChange = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const counts =
    data && !isOtherCategory
      ? {
          ai: data.counts.ai_suspected_count,
          real: data.counts.real_estimated_count,
        }
      : undefined;

  const getSummary = () => {
    if (!data || isOtherCategory || isError) return '';
    if (search)
      return `검색 결과 ${formatCount(data.pagination.total_items)}건`;
    if (counts?.[category] === 0) return '선택한 기간 0건';
    return `전체 분석 ${formatCount(data.counts.total_count)}건 중 ${formatRatio(data.counts.category_ratio)}`;
  };

  const renderContent = () => {
    // 처음 불러올 때, 탭을 옮긴 직후, 또는 실패 후 다시 불러오는 중
    if (isPending || isOtherCategory || (isError && isFetching)) {
      return <ImageListSkeleton />;
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

    if (data.items.length === 0) {
      return search ? (
        <AdminStateCard
          variant="empty"
          title={`'${search}'에 해당하는 분석 결과가 없어요`}
          description="분석 ID를 다시 확인해주세요"
        />
      ) : (
        <AdminStateCard
          variant="empty"
          title="선택한 기간에 해당하는 이미지가 없어요"
          description="기간을 바꿔서 다시 확인해보세요"
        />
      );
    }

    return (
      <div
        className={`flex w-full flex-col gap-[24px] transition-opacity duration-200 ${
          isPlaceholderData ? 'opacity-60' : 'animate-fade-in'
        }`}
        aria-busy={isPlaceholderData}
      >
        <ul className="grid w-full grid-cols-2 gap-[16px] lg:grid-cols-4">
          {data.items.map((image) => (
            <li key={image.id} className="min-w-0">
              <ImageCard image={image} category={category} />
            </li>
          ))}
        </ul>
        <Pagination
          page={data.pagination.page}
          totalPages={data.pagination.total_pages}
          onChange={handlePageChange}
        />
      </div>
    );
  };

  return (
    <>
      <AdminPageHeader
        title="이미지 목록"
        description="분석된 이미지를 판정 결과별로 확인해요"
        actions={<PeriodSelect value={period} onChange={setPeriod} />}
      />
      <CategoryTabs current={category} period={period} counts={counts} />
      <div className="flex w-full flex-wrap items-center gap-[10px]">
        <p
          aria-live="polite"
          className="min-w-0 flex-1 text-[15px] leading-[1.45] font-bold text-neutral-text"
        >
          {getSummary()}
        </p>
        <ImageSearch value={search} onSearch={setSearch} />
        <AdminSelect
          label="정렬"
          size="sm"
          value={sort}
          options={IMAGE_SORT_OPTIONS}
          onChange={setSort}
        />
      </div>
      {renderContent()}
    </>
  );
};

export default ImageListContent;
