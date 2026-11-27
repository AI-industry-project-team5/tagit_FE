/**
 * 없는 분석 번호(404 JOB_NOT_FOUND)인지 확인합니다.
 * axios 오류와 mock 오류 모두 error.response 에 status·data 가 있습니다.
 */
export const isNotFoundError = (error: unknown) => {
  if (typeof error !== 'object' || error === null || !('response' in error)) {
    return false;
  }

  const { response } = error as {
    response?: { status?: number; data?: { error_code?: string } };
  };
  return (
    response?.status === 404 || response?.data?.error_code === 'JOB_NOT_FOUND'
  );
};
