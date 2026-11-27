import { IMAGE_PAGE_SIZE } from '@pages/admin/images/constants/imageList';

/** 이미지 목록 불러오는 중 — 카드 8장 모양 스켈레톤 */
const ImageListSkeleton = () => {
  return (
    <div
      role="status"
      aria-label="이미지 목록을 불러오는 중"
      className="grid w-full animate-pulse grid-cols-2 gap-[16px] lg:grid-cols-4"
    >
      {Array.from({ length: IMAGE_PAGE_SIZE }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-[10px] rounded-[22px] bg-white px-[14px] pt-[14px] pb-[16px] shadow-admin-card"
        >
          <div className="h-[170px] rounded-[16px] bg-neutral-bg" />
          <div className="h-[19px] w-[140px] rounded-[8px] bg-neutral-border" />
          <div className="h-[20px] w-[80px] rounded-[8px] bg-neutral-bg" />
        </div>
      ))}
    </div>
  );
};

export default ImageListSkeleton;
