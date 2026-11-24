import { Navigate, createBrowserRouter } from 'react-router-dom';
import RootLayout from '@layout/RootLayout';
import UserLayout from '@layout/UserLayout';
import ErrorPage from '@layout/ErrorPage';
import NotFoundPage from '@pages/notFound/NotFoundPage';
import { adminRoutes } from '@routes/adminRoutes';
import { paths } from '@routes/path';
import { userRoutes } from '@routes/userRoutes';

const router = createBrowserRouter([
  {
    path: paths.root,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        // / 는 사용자 메인(/user)으로 이동
        index: true,
        element: <Navigate to={paths.userRoot} replace />,
      },
      {
        path: paths.userRoot,
        element: <UserLayout />,
        children: userRoutes,
      },
      // 관리자 라우트 (/admin/*) — adminRoutes.tsx 에서 관리
      ...adminRoutes,
      {
        // 그 외 모든 주소 — 사용자 레이아웃(헤더) 안에서 404 화면 표시
        path: '*',
        element: <UserLayout />,
        children: [{ path: '*', element: <NotFoundPage /> }],
      },
    ],
  },
]);

export default router;
