/**
 * 백엔드 API 엔드포인트
 * 백엔드와 API 명세를 합의하면 이 파일의 경로를 맞춰 수정합니다.
 */
export const API_ENDPOINT = {
  ANALYSIS: {
    /** 인증 사진 업로드 및 분석 요청 */
    CREATE: '/analyses',
    /** 분석 상태 및 결과 조회 */
    DETAIL: (analysisId: string) => `/analyses/${analysisId}`,
    /** 공유 링크 생성 */
    SHARE: (analysisId: string) => `/analyses/${analysisId}/share`,
  },
  SHARE: {
    /** 공유된 결과 조회 */
    DETAIL: (token: string) => `/shares/${token}`,
  },
};
