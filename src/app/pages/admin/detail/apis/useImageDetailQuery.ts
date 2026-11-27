import { useQuery } from '@tanstack/react-query';
import { isNotFoundError } from '@pages/admin/detail/utils/apiError';
import { toDetailView } from '@pages/admin/detail/utils/toDetailView';
import { fetchImageDetail } from '@shared/mocks/mockAdminApi';
import type { AdminMockScenario } from '@shared/mocks/mockAdminApi';

/**
 * 검증 결과 상세 조회
 * 현재는 Mock API 를 호출합니다. API 연동 시 queryFn 만
 * axiosInstance.get<AdminImageDetailResponse>(API_ENDPOINT.ADMIN.IMAGE_DETAIL(imageId)) 로 교체합니다.
 * 없는 분석 번호(404)는 다시 시도하지 않습니다.
 */
export const useImageDetailQuery = (
  imageId: string,
  scenario: AdminMockScenario
) =>
  useQuery({
    queryKey: ['admin', 'images', 'detail', imageId, scenario],
    queryFn: () => fetchImageDetail(imageId, scenario),
    select: toDetailView,
    retry: (failureCount, error) => !isNotFoundError(error) && failureCount < 1,
  });
