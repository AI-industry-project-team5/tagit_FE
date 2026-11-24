import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import AdminLayout from '@layout/AdminLayout';
import RequireAdminAuth from '@layout/RequireAdminAuth';
import AdminLoginPage from '@pages/admin/login/AdminLoginPage';
import DashboardPage from '@pages/admin/dashboard/DashboardPage';
import ImageListPage from '@pages/admin/images/ImageListPage';
import AnalysisDetailPage from '@pages/admin/detail/AnalysisDetailPage';
import { paths } from '@routes/path';

const toDashboard = <Navigate to={paths.adminDashboard} replace />;

/**
 * 관리자 영역 라우트 (/admin/*)
 * - /admin/login 은 사이드바 없이 단독 화면
 * - 그 외는 로그인 가드(RequireAdminAuth) → 사이드바 레이아웃(AdminLayout) 안에서 표시
 * - /admin 과 없는 관리자 주소는 대시보드로 이동
 */
export const adminRoutes: RouteObject[] = [
  {
    path: paths.adminLogin,
    element: <AdminLoginPage />,
  },
  {
    path: paths.adminRoot,
    element: <RequireAdminAuth />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: toDashboard },
          { path: paths.adminDashboard, element: <DashboardPage /> },
          { path: paths.adminImages, element: <ImageListPage /> },
          { path: paths.adminDetail, element: <AnalysisDetailPage /> },
          { path: '*', element: toDashboard },
        ],
      },
    ],
  },
];
