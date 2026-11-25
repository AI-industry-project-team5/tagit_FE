import { Outlet } from 'react-router-dom';
import AdminSidebar from '@pages/admin/components/AdminSidebar';

/**
 * 관리자 영역(/admin/*) 공통 레이아웃
 * - 왼쪽 사이드바(260px, 화면 높이 고정) + 오른쪽 콘텐츠
 */
const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-neutral-bg">
      <AdminSidebar />
      <main className="flex min-w-0 flex-1 flex-col gap-[24px] px-[40px] pt-[36px] pb-[48px]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
