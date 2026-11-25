import { Link } from 'react-router-dom';
import { getAdminDetailPath } from '@routes/path';
import type { AdminImageCategory } from '@routes/path';
import type { AdminImageSummary } from '@shared/types/admin';

interface RecentImageItemProps {
  image: AdminImageSummary;
  category: AdminImageCategory;
}

const BADGE_CLASS: Record<AdminImageCategory, string> = {
  ai: 'bg-verdict-danger-bg text-verdict-danger',
  real: 'bg-verdict-safe-bg text-verdict-safe',
};

/** 최근 이미지 썸네일 + "AI 92%" 뱃지 — 누르면 검증 결과 상세로 이동 */
const RecentImageItem = ({ image, category }: RecentImageItemProps) => {
  return (
    <Link
      to={getAdminDetailPath(image.analysisId)}
      aria-label={`${image.analysisId} 상세 보기 (AI 의심 ${image.suspicionPercent}%)`}
      className="group flex min-w-0 flex-col items-start gap-[6px] rounded-[16px]"
    >
      <span className="block h-[96px] w-full overflow-hidden rounded-[16px] bg-placeholder-photo-bg">
        <img
          src={image.imageUrl}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </span>
      <span
        className={`rounded-[10px] px-[8px] py-[2px] text-[11px] leading-[1.45] font-bold whitespace-nowrap ${BADGE_CLASS[category]}`}
      >
        AI {image.suspicionPercent}%
      </span>
    </Link>
  );
};

export default RecentImageItem;
