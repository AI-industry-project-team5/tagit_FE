import type { BoundingBox, Verdict } from '@shared/types/analysis';
import type { MetadataInfo } from '@shared/types/userResult';

/**
 * 검증 결과 상세 화면용 데이터
 * 서버 응답(AdminImageDetailResponse)을 공통 결과 컴포넌트가 쓰는 형태로 바꾼 값입니다.
 */
export interface DetailView {
  id: number;
  /** "A-3921" */
  analysisId: string;
  /** 분석 완료 시각 (ISO) */
  completedAt: string;
  /** 삭제된 이미지는 null */
  imageUrl: string | null;
  verdict: Verdict;
  /** AI 합성 의심 0~100 (판단 불가면 null) */
  percent: number | null;
  memoBox: BoundingBox | null;
  heatmapUrl: string | null;
  ocrText: string | null;
  metadata: MetadataInfo;
  /** 모델별 확률 0~1 */
  models: {
    detection: number | null;
    classification: number | null;
    pytorch: number | null;
  };
}

/** 목록·대시보드에서 상세로 넘어올 때 함께 보내는 값 */
export interface DetailLocationState {
  /** 돌아갈 주소 (경로 + 쿼리) */
  from: string;
}
