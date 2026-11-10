import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@layout/RootLayout';
import ErrorPage from '@layout/ErrorPage';
import UploadPage from '@pages/upload/UploadPage';
import AnalyzingPage from '@pages/analyzing/AnalyzingPage';
import ResultPage from '@pages/result/ResultPage';
import SharedResultPage from '@pages/share/SharedResultPage';
import NotFoundPage from '@pages/notFound/NotFoundPage';
import { paths } from '@routes/path';

const router = createBrowserRouter([
  {
    path: paths.upload,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
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
    ],
  },
]);

export default router;
