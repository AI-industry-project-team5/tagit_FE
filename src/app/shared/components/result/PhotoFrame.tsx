import type { ReactNode } from 'react';

/**
 * 결과 화면 사진 영역 (Figma Photo, 600×470 비율)
 * 바운딩 박스·히트맵 같은 오버레이는 children 으로 받습니다.
 * 오버레이 좌표는 프레임 크기 대비 비율(0~1)로 계산합니다.
 */
interface PhotoFrameProps {
  imageUrl: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
}

const PhotoFrame = ({
  imageUrl,
  alt = '업로드한 인증 사진',
  children,
  className = '',
}: PhotoFrameProps) => {
  return (
    <div
      className={`relative aspect-[600/470] w-full overflow-hidden rounded-[24px] bg-placeholder-photo-bg ${className}`}
    >
      <img
        src={imageUrl}
        alt={alt}
        className="absolute inset-0 size-full object-cover"
      />
      {children}
    </div>
  );
};

export default PhotoFrame;
