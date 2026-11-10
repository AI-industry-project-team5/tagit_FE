export const paths = {
  /** 인증 사진 업로드 */
  upload: '/',
  /** 분석 진행 상태 */
  analyzing: '/analyzing/:analysisId',
  /** 분석 결과 */
  result: '/result/:analysisId',
  /** 공유된 분석 결과 (읽기 전용) */
  share: '/share/:token',
} as const;

export const getAnalyzingPath = (analysisId: string) =>
  `/analyzing/${analysisId}`;

export const getResultPath = (analysisId: string) => `/result/${analysisId}`;

export const getSharePath = (token: string) => `/share/${token}`;
