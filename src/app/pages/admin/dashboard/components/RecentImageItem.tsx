import { Link, useLocation } from 'react-router-dom';
import { getAdminDetailPath } from '@routes/path';
import type { AdminImageCategory } from '@routes/path';
import type { DetailLocationState } from '@pages/admin/detail/types/detailView';
import AdminThumbnail from '@pages/admin/components/AdminThumbnail';
import { formatAnalysisId, toPercent } from '@pages/admin/utils/format';
import type { AdminRecentImage } from '@shared/types/admin';

interface RecentImageItemProps {
  image: AdminRecentImage;
  category: AdminImageCategory;
}

const BADGE_CLASS: Record<AdminImageCategory, string> = {
  ai: 'bg-verdict-danger-bg text-verdict-danger',
  real: 'bg-verdict-safe-bg text-verdict-safe',
};

/** 최근 이미지 썸네일 + "AI 92%" 뱃지 — 누르면 검증 결과 상세로 이동 */
const RecentImageItem = ({ image, category }: RecentImageItemProps) => {
  const location = useLocation();
  const analysisId = formatAnalysisId(image.id);
  const percent = toPercent(image.probability);

  return (
    <Link
      to={getAdminDetailPath(String(image.id))}
      // 상세의 '목록으로'가 지금 보던 화면으로 돌아오도록
      state={
        {
          from: location.pathname + location.search,
        } satisfies DetailLocationState
      }
      aria-label={`${analysisId} 상세 보기${percent === null ? '' : ` (AI 의심 ${percent}%)`}`}
      className="group flex min-w-0 flex-col items-start gap-[6px] rounded-[16px]"
    >
      <AdminThumbnail src={image.thumbnail_url} className="h-[96px] w-full" />
      {percent !== null && (
        <span
          className={`rounded-[10px] px-[8px] py-[2px] text-[11px] leading-[1.45] font-bold whitespace-nowrap ${BADGE_CLASS[category]}`}
        >
          AI {percent}%
        </span>
      )}
    </Link>
  );
};

export default RecentImageItem;
