import imageIcon from '@shared/assets/icons/image.svg';

interface AdminThumbnailProps {
  /** 삭제된 이미지는 null */
  src: string | null;
  className?: string;
}

/** 관리자 화면 썸네일 — 이미지가 없으면 회색 칸에 이미지 아이콘 */
const AdminThumbnail = ({ src, className = '' }: AdminThumbnailProps) => {
  return (
    <span
      className={`flex items-center justify-center overflow-hidden rounded-[16px] bg-placeholder-photo-bg ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <img src={imageIcon} alt="" width={28} height={28} />
      )}
    </span>
  );
};

export default AdminThumbnail;
