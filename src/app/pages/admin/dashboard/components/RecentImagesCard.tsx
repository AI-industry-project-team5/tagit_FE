import { Link } from 'react-router-dom';
import { getAdminImagesPath } from '@routes/path';
import type { AdminImageCategory } from '@routes/path';
import { withPeriod } from '@pages/admin/utils/period';
import RecentImageItem from '@pages/admin/dashboard/components/RecentImageItem';
import type { AdminPeriod, AdminRecentImage } from '@shared/types/admin';

interface RecentImagesCardProps {
  title: string;
  category: AdminImageCategory;
  images: AdminRecentImage[];
  period: AdminPeriod;
}

/** 최근 이미지 4장 + "전체 보기 →" (해당 이미지 목록으로, 기간 유지) */
const RecentImagesCard = ({
  title,
  category,
  images,
  period,
}: RecentImagesCardProps) => {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-[16px] rounded-[24px] bg-white px-[28px] py-[24px] shadow-admin-card">
      <div className="flex items-center justify-between leading-[1.45] font-bold">
        <h2 className="text-[17px] text-neutral-text">{title}</h2>
        <Link
          to={withPeriod(getAdminImagesPath(category), period)}
          className="text-[13px] text-brand-green-500 transition-opacity duration-200 hover:opacity-70"
        >
          전체 보기 →
        </Link>
      </div>

      {images.length > 0 ? (
        <ul className="grid grid-cols-4 gap-[12px]">
          {images.map((image) => (
            <li key={image.id} className="min-w-0">
              <RecentImageItem image={image} category={category} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex h-[122px] items-center justify-center rounded-[16px] bg-neutral-bg text-[14px] font-medium text-neutral-text-muted">
          아직 분석된 이미지가 없어요
        </p>
      )}
    </section>
  );
};

export default RecentImagesCard;
