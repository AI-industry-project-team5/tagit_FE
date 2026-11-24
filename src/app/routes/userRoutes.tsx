import type { RouteObject } from 'react-router-dom';
import UploadPage from '@pages/user/upload/UploadPage';
import AnalyzingPage from '@pages/user/analyzing/AnalyzingPage';
import ResultPage from '@pages/user/result/ResultPage';
import SharedResultPage from '@pages/user/share/SharedResultPage';
import NotFoundPage from '@pages/notFound/NotFoundPage';
import { paths } from '@routes/path';

/** 사용자 영역 라우트 (/user/*) */
export const userRoutes: RouteObject[] = [
  {
    index: true,
    element: <UploadPage />,
  },
  {
    path: paths.analyzing,
    element: <AnalyzingPage />,
  },
  {
    path: paths.result,
    element: <ResultPage />,
  },
  {
    path: paths.share,
    element: <SharedResultPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
