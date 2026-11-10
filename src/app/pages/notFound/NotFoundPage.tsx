import { Link } from 'react-router-dom';
import { paths } from '@routes/path';

const NotFoundPage = () => {
  return (
    <main>
      <h1>페이지를 찾을 수 없어요</h1>
      <Link to={paths.upload}>처음으로 돌아가기</Link>
    </main>
  );
};

export default NotFoundPage;
