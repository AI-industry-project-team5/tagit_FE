import { Link, NavLink } from 'react-router-dom';
import { getAdminImagesPath, paths } from '@routes/path';
import AdminLogo from '@pages/admin/components/AdminLogo';

const NAV_ITEMS = [
  { label: '대시보드', to: paths.adminDashboard },
  { label: 'AI 의심 이미지', to: getAdminImagesPath('ai') },
  { label: '실제 촬영 이미지', to: getAdminImagesPath('real') },
] as const;

/** 관리자 사이드바 — 로고, 메뉴(현재 메뉴 강조), 서비스로 이동 */
const AdminSidebar = () => {
  return (
    <aside className="sticky top-0 flex h-screen w-[260px] shrink-0 flex-col gap-[6px] border-r border-neutral-border bg-white px-[20px] py-[28px]">
      <Link
        to={paths.adminDashboard}
        className="self-start pb-[24px] pl-[8px] transition-opacity duration-200 hover:opacity-70"
      >
        <AdminLogo size="sm" />
      </Link>

      <nav aria-label="관리자 메뉴" className="flex flex-col gap-[6px]">
        {NAV_ITEMS.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `rounded-[14px] px-[16px] py-[12px] text-[15px] leading-[1.45] transition-colors duration-200 ${
                isActive
                  ? 'bg-brand-green-100 font-bold text-brand-green-500'
                  : 'font-medium text-neutral-text-sub hover:bg-neutral-bg'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <Link
        to={paths.upload}
        className="mt-auto self-start text-[14px] leading-[1.45] font-medium text-neutral-text-sub transition-colors duration-200 hover:text-neutral-text"
      >
        서비스로 이동 →
      </Link>
    </aside>
  );
};

export default AdminSidebar;
