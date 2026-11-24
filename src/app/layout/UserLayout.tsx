import { Outlet } from 'react-router-dom';
import Header from '@shared/components/layout/Header';
import UserPhotoProvider from '@shared/contexts/UserPhotoProvider';

/**
 * 사용자 영역(/user/*) 공통 레이아웃
 * - C-01 헤더(TAG:IT 로고만 표시)
 * - 선택한 기능과 업로드한 사진을 화면 간에 유지하는 Provider
 */
const UserLayout = () => {
  return (
    <UserPhotoProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <Outlet />
      </div>
    </UserPhotoProvider>
  );
};

export default UserLayout;
