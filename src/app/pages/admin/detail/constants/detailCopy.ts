/** 검증 결과 상세 화면 문구 */
export const DETAIL_COPY = {
  title: '검증 결과 상세',
  back: '← 목록으로',
  /** AD-k 판단 근거 히트맵 생성 실패 */
  heatmapFailed:
    '판단 근거 히트맵을 만들지 못했어요. 분류 결과는 정상적으로 저장됐어요.',
  /** 메타데이터 편집 프로그램 (editStatus = EDITED) */
  editedEditor: 'AI 이미지 편집 도구 기록 발견',
  photoDeleted: '삭제된 이미지예요',
  notFoundTitle: '분석 결과를 찾을 수 없어요',
  notFoundDescription: '분석 번호를 다시 확인해주세요',
} as const;

/** 모델 결과 카드 칸 (Figma A-03 Model Result Card) */
export const MODEL_RESULT_ITEMS = [
  { key: 'detection', label: '메모 영역 탐지', model: 'Custom Vision' },
  { key: 'classification', label: 'AI 합성', model: 'Custom Vision' },
  { key: 'pytorch', label: 'AI 합성', model: 'PyTorch' },
] as const;
