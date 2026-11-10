import { Link } from 'react-router-dom';
import { paths } from '@routes/path';

const ErrorPage = () => {
  return (
    <main>
      <h1>문제가 발생했어요</h1>
      <p>잠시 후 다시 시도해 주세요.</p>
      <Link to={paths.upload}>처음으로 돌아가기</Link>
    </main>
  );
};

export default ErrorPage;
