import { Navigate, useParams } from 'react-router-dom';
import { getAdminImagesPath } from '@routes/path';
import ImageListContent from '@pages/admin/images/components/ImageListContent';
import { isImageCategory } from '@pages/admin/images/utils/category';

/** A-02 이미지 목록 · A-02-b 실제 촬영 */
const ImageListPage = () => {
  const { category } = useParams();

  // 정해진 분류(ai, real)가 아니면 AI 의심 목록으로
  if (!isImageCategory(category)) {
    return <Navigate to={getAdminImagesPath('ai')} replace />;
  }

  // 탭마다 검색 입력·스크롤 상태를 새로 시작합니다.
  return <ImageListContent key={category} category={category} />;
};

export default ImageListPage;
