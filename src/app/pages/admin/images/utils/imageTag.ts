import type { AdminImageItem } from '@shared/types/admin';

export type ImageTagType = 'edited' | 'ocrFailed' | 'noMetadata' | 'normal';

export const IMAGE_TAG: Record<
  ImageTagType,
  { label: string; className: string }
> = {
  edited: {
    label: '편집 기록 발견',
    className: 'bg-verdict-suspicious-bg text-verdict-suspicious',
  },
  ocrFailed: {
    label: '글씨 인식 실패',
    className: 'bg-verdict-suspicious-bg text-verdict-suspicious',
  },
  noMetadata: {
    label: '메타데이터 없음',
    className: 'bg-verdict-hold-bg text-verdict-hold',
  },
  normal: {
    label: '특이사항 없음',
    className: 'bg-verdict-safe-bg text-verdict-safe',
  },
};

/**
 * 카드에 보여줄 특이사항 태그 1개
 * 여러 개에 해당하면 편집 기록 발견 > 글씨 인식 실패 > 메타데이터 없음 순으로 표시합니다.
 */
export const getImageTag = ({
  edit_status: editStatus,
  ocr_status: ocrStatus,
}: Pick<AdminImageItem, 'edit_status' | 'ocr_status'>): ImageTagType => {
  if (editStatus === 'EDITED') return 'edited';
  if (ocrStatus === 'FAILED' || ocrStatus === 'NO_TEXT') return 'ocrFailed';
  if (editStatus === 'NONE') return 'noMetadata';
  return 'normal';
};
