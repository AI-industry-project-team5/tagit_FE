/** 판정 단계: 안전 / 의심 / 위험 / 판단 보류 */
export type Verdict = 'safe' | 'suspicious' | 'danger' | 'hold';

/** 분석 진행 상태 */
export type AnalysisStatus = 'processing' | 'completed' | 'failed';

/** 판단 보류 사유 */
export type HoldReason = 'memo_not_found' | 'low_resolution' | 'too_blurry';

/** 메모 영역 바운딩 박스 (원본 이미지 크기 대비 0~1 비율) */
export interface BoundingBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** 분석 요청 응답 */
export interface CreateAnalysisResponse {
  analysisId: string;
}

/** 분석 결과 */
export interface AnalysisResult {
  analysisId: string;
  status: AnalysisStatus;
  /** 업로드한 원본 이미지 주소 */
  imageUrl: string;
  verdict: Verdict | null;
  /** 판단 보류 사유 (verdict가 'hold'일 때) */
  holdReason: HoldReason | null;
  /** 탐지된 메모 영역 (미탐지 시 null) */
  memoBox: BoundingBox | null;
  /** OCR로 읽은 문구 (인식 불가 시 null) */
  ocrText: string | null;
  /** AI 합성 의심 확률 (0~100) */
  suspicionPercent: number | null;
  createdAt: string;
}

/** 공유 링크 생성 응답 */
export interface CreateShareResponse {
  token: string;
  expiresAt: string;
}

/** 공유된 분석 결과 */
export interface SharedAnalysisResult extends AnalysisResult {
  /** 공유 링크 만료 시각 */
  expiresAt: string;
}
