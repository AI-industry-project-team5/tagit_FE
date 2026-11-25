import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { paths } from '@routes/path';
import { isAdminLoggedIn } from '@pages/admin/utils/adminAuth';

/**
 * 관리자 영역 접근 가드
 * 로그인하지 않았으면 로그인 화면으로 보내고, 로그인 후 원래 가려던 주소로 돌아오도록
 * 현재 주소를 state.from 으로 넘깁니다.
 */
const RequireAdminAuth = () => {
  const location = useLocation();

  if (!isAdminLoggedIn()) {
    return (
      <Navigate
        to={paths.adminLogin}
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <Outlet />;
};

export default RequireAdminAuth;
