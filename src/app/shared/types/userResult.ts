import type { BoundingBox, HoldReason, Verdict } from '@shared/types/analysis';

/**
 * 사용자 결과 화면용 뷰 모델
 * - 화면(컴포넌트)이 필요로 하는 값만 정의한 것으로, 백엔드 응답 스키마가 아닙니다.
 * - API 명세가 확정되면 응답을 이 형태로 변환하는 매핑 함수를 추가합니다.
 */

/** 메타데이터 판정 (기능 1 보조 단서, 점수에 반영하지 않음) */
export type MetadataStatus = 'clean' | 'edited' | 'missing';

export interface MetadataInfo {
  status: MetadataStatus;
  /** 촬영 기기 (없으면 null) */
  device: string | null;
  /** 촬영 일시 표시 문자열 (없으면 null) */
  capturedAt: string | null;
  /** 편집 프로그램·AI 도구 기록 (없으면 null) */
  editor: string | null;
}

/** 기능 1 · AI 합성 의심도 결과 */
export interface AiCheckResult {
  analysisId: string;
  /** 분석 시각 (ISO 문자열) */
  analyzedAt: string;
  imageUrl: string;
  verdict: Verdict;
  /** 판단 보류 사유 (verdict 가 'hold' 일 때) */
  holdReason: HoldReason | null;
  /** AI 합성 의심 확률 0~100 (판단 보류 시 null) */
  suspicionPercent: number | null;
  /** 메모 영역 (이미지 크기 대비 0~1 비율, 미탐지 시 null) */
  memoBox: BoundingBox | null;
  /** OCR 텍스트 (인식 실패 시 null) */
  ocrText: string | null;
  /** 히트맵 이미지 (생성 실패 시 null) */
  heatmapUrl: string | null;
  metadata: MetadataInfo;
}

/** 기능 2 · 검색 결과 상태 */
export type SimilarSearchStatus = 'found' | 'none' | 'failed';

export interface MatchItem {
  id: string;
  /** 미리보기 이미지 (없으면 회색 자리 표시) */
  thumbnailUrl: string | null;
  /** 게시글 제목 (똑같은 사진 목록에서만 표시) */
  title: string | null;
  /** 출처 도메인 */
  source: string;
  /** 게시일 표시 문자열 */
  postedAt: string | null;
  /** 외부 게시글 주소 */
  link: string;
}

/** 기능 2 · 비슷한 이미지 찾기 결과 */
export interface SimilarSearchResult {
  searchId: string;
  /** 검색 시각 (ISO 문자열) */
  searchedAt: string;
  imageUrl: string;
  status: SimilarSearchStatus;
  /** exact matches — 똑같은 사진 */
  exactMatches: MatchItem[];
  /** visual matches — 비슷한 사진 */
  visualMatches: MatchItem[];
}

/** 공유 링크 정보 */
export interface ShareLinkInfo {
  token: string;
  /** 만료 시각 (ISO 문자열) */
  expiresAt: string;
}
