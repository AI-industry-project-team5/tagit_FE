import ShareMessageCard from '@pages/user/share/components/ShareMessageCard';
import { useStartFeature } from '@pages/user/result/hooks/useStartFeature';

/**
 * 존재하지 않는 주소 · S-b 없는 링크 (S-04)
 * 없는 공유 링크와 일반 404 를 같은 화면으로 처리합니다.
 * (UserLayout 안에서 렌더링되어 헤더와 사진 보관 Context 를 사용합니다.)
 */
const NotFoundPage = () => {
  const { restartWith } = useStartFeature();

  return (
    <main className="flex flex-1 animate-fade-in items-center justify-center bg-gradient-to-b from-page-top via-page-mid via-60% to-page-bottom px-[16px] py-[40px]">
      <ShareMessageCard kind="not-found" onStart={() => restartWith('ai')} />
    </main>
  );
};

export default NotFoundPage;
