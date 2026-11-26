import { IMAGE_TAG } from '@pages/admin/images/utils/imageTag';
import type { ImageTagType } from '@pages/admin/images/utils/imageTag';

interface ImageTagProps {
  type: ImageTagType;
}

/** 이미지 카드 특이사항 태그 (편집 기록 발견 · 글씨 인식 실패 · 메타데이터 없음 · 특이사항 없음) */
const ImageTag = ({ type }: ImageTagProps) => {
  const { label, className } = IMAGE_TAG[type];

  return (
    <span
      className={`rounded-[8px] px-[8px] py-[2px] text-[11px] leading-[1.45] font-bold whitespace-nowrap ${className}`}
    >
      {label}
    </span>
  );
};

export default ImageTag;
