import { Navigate, useParams } from 'react-router-dom';
import { getAdminImagesPath } from '@routes/path';
import type { AdminImageCategory } from '@routes/path';

const CATEGORIES: readonly AdminImageCategory[] = ['ai', 'real'];

const isCategory = (value: string | undefined): value is AdminImageCategory =>
  CATEGORIES.some((category) => category === value);

/** A-02 이미지 목록 (화면은 다음 이슈에서 구현) */
const ImageListPage = () => {
  const { category } = useParams();

  // 정해진 분류(ai, real)가 아니면 AI 의심 목록으로
  if (!isCategory(category)) {
    return <Navigate to={getAdminImagesPath('ai')} replace />;
  }

  return (
    <div className="flex flex-col gap-[4px] leading-[1.45]">
      <h1 className="text-[28px] font-black text-neutral-text">이미지 목록</h1>
      <p className="text-[14px] text-neutral-text-sub">
        분석된 이미지를 판정 결과별로 확인해요
      </p>
    </div>
  );
};

export default ImageListPage;
