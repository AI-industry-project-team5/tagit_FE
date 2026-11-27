import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchImageList } from '@shared/mocks/mockAdminApi';
import type { AdminMockScenario } from '@shared/mocks/mockAdminApi';
import type { AdminImageListParams } from '@shared/types/admin';

/**
 * 이미지 목록 조회
 * 현재는 Mock API 를 호출합니다. API 연동 시 queryFn 만
 * axiosInstance.get<AdminImageListResponse>(API_ENDPOINT.ADMIN.IMAGES, { params }) 로 교체합니다.
 * 페이지를 넘기는 동안에는 이전 목록을 유지해 화면이 깜빡이지 않도록 합니다.
 */
export const useImageListQuery = (
  params: AdminImageListParams,
  scenario: AdminMockScenario
) =>
  useQuery({
    queryKey: ['admin', 'images', params, scenario],
    queryFn: () => fetchImageList(params, scenario),
    placeholderData: keepPreviousData,
  });
