import { Link, useLocation } from 'react-router-dom';
import { getAdminDetailPath } from '@routes/path';
import type { AdminImageCategory } from '@routes/path';
import type { DetailLocationState } from '@pages/admin/detail/types/detailView';
import AdminThumbnail from '@pages/admin/components/AdminThumbnail';
import ImageTag from '@pages/admin/images/components/ImageTag';
import { getImageTag, IMAGE_TAG } from '@pages/admin/images/utils/imageTag';
import {
  formatAnalysisId,
  formatDateTime,
  toPercent,
} from '@pages/admin/utils/format';
import type { AdminImageItem } from '@shared/types/admin';

interface ImageCardProps {
  image: AdminImageItem;
  category: AdminImageCategory;
}

const SCORE_CLASS: Record<AdminImageCategory, string> = {
  ai: 'bg-verdict-danger',
  real: 'bg-verdict-safe',
};

/** 이미지 카드 — 썸네일 · AI 의심 % · 분석 번호와 시각 · 특이사항 태그 */
const ImageCard = ({ image, category }: ImageCardProps) => {
  const location = useLocation();
  const analysisId = formatAnalysisId(image.id);
  const dateTime = formatDateTime(image.completed_at);
  const percent = toPercent(image.probability);
  const tag = getImageTag(image);

  return (
    <Link
      to={getAdminDetailPath(String(image.id))}
      // 상세의 '목록으로'가 지금 보던 화면으로 돌아오도록
      state={
        {
          from: location.pathname + location.search,
        } satisfies DetailLocationState
      }
      aria-label={`${analysisId} 상세 보기, ${percent === null ? '' : `AI 의심 ${percent}%, `}${IMAGE_TAG[tag].label}`}
      className="group flex min-w-0 flex-col items-start gap-[10px] rounded-[22px] bg-white px-[14px] pt-[14px] pb-[16px] shadow-admin-card transition-transform duration-200 hover:-translate-y-[2px]"
    >
      <span className="relative block w-full">
        <AdminThumbnail
          src={image.thumbnail_url}
          className="h-[170px] w-full"
        />
        {percent !== null && (
          <span
            className={`absolute top-[10px] left-[10px] rounded-[12px] px-[10px] py-[3px] text-[12px] leading-[1.45] font-bold whitespace-nowrap text-white ${SCORE_CLASS[category]}`}
          >
            AI 의심 {percent}%
          </span>
        )}
      </span>
      <span className="text-[13px] leading-[1.45] font-bold whitespace-nowrap text-neutral-text">
        #{analysisId} · {dateTime}
      </span>
      <ImageTag type={tag} />
    </Link>
  );
};

export default ImageCard;
