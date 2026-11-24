import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { paths } from '@routes/path';
import { isAdminLoggedIn } from '@pages/admin/utils/adminAuth';
import LoginBrandPanel from '@pages/admin/login/components/LoginBrandPanel';
import LoginForm from '@pages/admin/login/components/LoginForm';

interface LoginLocationState {
  from?: string;
}

/** A-00 관리자 로그인 */
const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as LoginLocationState | null)?.from ?? paths.adminDashboard;

  // 이미 로그인한 상태면 바로 관리자 화면으로
  if (isAdminLoggedIn()) {
    return <Navigate to={paths.adminDashboard} replace />;
  }

  return (
    <div className="flex min-h-screen bg-white">
      <LoginBrandPanel />
      <main className="flex flex-1 animate-fade-in items-center justify-center px-[16px] py-[40px]">
        <LoginForm onSuccess={() => navigate(from, { replace: true })} />
      </main>
    </div>
  );
};

export default AdminLoginPage;
