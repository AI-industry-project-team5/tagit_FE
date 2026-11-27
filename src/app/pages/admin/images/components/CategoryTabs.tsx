import { Link } from 'react-router-dom';
import { getAdminImagesPath } from '@routes/path';
import type { AdminImageCategory } from '@routes/path';
import {
  ADMIN_IMAGE_CATEGORIES,
  CATEGORY_LABEL,
} from '@pages/admin/images/constants/imageList';
import { formatCount } from '@pages/admin/utils/format';
import { withPeriod } from '@pages/admin/utils/period';
import type { AdminPeriod } from '@shared/types/admin';

interface CategoryTabsProps {
  current: AdminImageCategory;
  period: AdminPeriod;
  /** 불러오기 전에는 건수를 숨깁니다. */
  counts?: Record<AdminImageCategory, number>;
}

const ACTIVE_COUNT_CLASS: Record<AdminImageCategory, string> = {
  ai: 'bg-verdict-danger text-white',
  real: 'bg-verdict-safe text-white',
};

/**
 * AI 생성·합성 의심 / 실제 촬영 추정 탭
 * 탭을 옮기면 기간만 유지하고 검색어·정렬·페이지는 처음으로 돌아갑니다.
 */
const CategoryTabs = ({ current, period, counts }: CategoryTabsProps) => {
  return (
    <nav
      aria-label="이미지 분류"
      className="flex gap-[4px] self-start rounded-[18px] bg-white p-[6px]"
    >
      {ADMIN_IMAGE_CATEGORIES.map((category) => {
        const active = category === current;
        return (
          <Link
            key={category}
            to={withPeriod(getAdminImagesPath(category), period)}
            aria-current={active ? 'page' : undefined}
            className={`flex items-center gap-[8px] rounded-[14px] px-[18px] py-[10px] leading-[1.45] font-bold whitespace-nowrap transition-colors duration-200 ${
              active
                ? 'bg-neutral-toast text-white'
                : 'text-neutral-text-sub hover:bg-neutral-bg'
            }`}
          >
            <span className="text-[15px]">{CATEGORY_LABEL[category]}</span>
            {counts && (
              <span
                className={`rounded-[10px] px-[8px] py-px text-[12px] ${
                  active
                    ? ACTIVE_COUNT_CLASS[category]
                    : 'bg-neutral-bg text-neutral-text-sub'
                }`}
              >
                {formatCount(counts[category])}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryTabs;
