import { useSearchParams } from 'react-router-dom';
import type { AdminImageCategory } from '@routes/path';
import {
  DEFAULT_ADMIN_PERIOD,
  PERIOD_QUERY_KEY,
} from '@pages/admin/constants/period';
import {
  DEFAULT_IMAGE_SORT,
  IMAGE_LIST_QUERY_KEY,
  IMAGE_SORT_OPTIONS,
} from '@pages/admin/images/constants/imageList';
import { parsePeriod } from '@pages/admin/utils/period';
import type { AdminImageSort, AdminPeriod } from '@shared/types/admin';

const { SEARCH, SORT, PAGE } = IMAGE_LIST_QUERY_KEY;

const parseSort = (
  raw: string | null,
  category: AdminImageCategory
): AdminImageSort =>
  IMAGE_SORT_OPTIONS.find((option) => option.value === raw)?.value ??
  DEFAULT_IMAGE_SORT[category];

const parsePage = (raw: string | null) => {
  const page = Number(raw);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

/**
 * 이미지 목록 상태 (?period=&q=&sort=&page=) 읽기·쓰기
 * - 기본값은 주소에서 생략합니다.
 * - 기간·검색어·정렬이 바뀌면 1페이지로 돌아갑니다.
 * - 다른 쿼리(?mock= 등)는 그대로 둡니다.
 */
export const useImageListParams = (category: AdminImageCategory) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const period = parsePeriod(searchParams.get(PERIOD_QUERY_KEY));
  const search = searchParams.get(SEARCH)?.trim() ?? '';
  const sort = parseSort(searchParams.get(SORT), category);
  const page = parsePage(searchParams.get(PAGE));

  const update = (
    changes: Record<string, string | null>,
    options?: { replace?: boolean }
  ) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete(PAGE);
      Object.entries(changes).forEach(([key, value]) => {
        if (value === null) params.delete(key);
        else params.set(key, value);
      });
      return params;
    }, options);
  };

  const setPeriod = (next: AdminPeriod) =>
    update(
      { [PERIOD_QUERY_KEY]: next === DEFAULT_ADMIN_PERIOD ? null : next },
      { replace: true }
    );

  const setSearch = (next: string) => update({ [SEARCH]: next.trim() || null });

  const setSort = (next: AdminImageSort) =>
    update({ [SORT]: next === DEFAULT_IMAGE_SORT[category] ? null : next });

  const setPage = (next: number, options?: { replace?: boolean }) =>
    update({ [PAGE]: next > 1 ? String(next) : null }, options);

  return {
    period,
    search,
    sort,
    page,
    setPeriod,
    setSearch,
    setSort,
    setPage,
  };
};
