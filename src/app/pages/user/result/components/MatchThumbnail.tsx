/**
 * 검색 결과 미리보기 (Figma 결과/찾은 이미지 Preview)
 * 이미지가 없으면 Figma 의 회색 자리 표시(물건 + 포스트잇)를 보여줍니다.
 */
interface MatchThumbnailProps {
  imageUrl: string | null;
  /** row: 똑같은 사진 목록 (132×99) / card: 비슷한 사진 그리드 (가로 꽉 참 × 112) */
  size: 'row' | 'card';
  className?: string;
}

/** Figma 미리보기 안의 물건·포스트잇 위치 (프레임 크기 대비 %) */
const PLACEHOLDER = {
  row: {
    object: { left: '12%', top: '15%', width: '45%', height: '70%' },
    note: { left: '51.6%', top: '46%', width: '29.2%', height: '39%' },
    noteInner: { width: '92.3%', height: '92.3%' },
  },
  card: {
    object: { left: '8.3%', top: '15%', width: '31.25%', height: '70%' },
    note: { left: '35.9%', top: '46%', width: '20.2%', height: '39%' },
    noteInner: { width: '92.3%', height: '92.3%' },
  },
} as const;

const MatchThumbnail = ({
  imageUrl,
  size,
  className = '',
}: MatchThumbnailProps) => {
  const placeholder = PLACEHOLDER[size];

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-[12px] bg-placeholder-photo-bg ${
        size === 'row' ? 'h-[99px] w-[132px]' : 'h-[112px] w-full'
      } ${className}`}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="" className="size-full object-cover" />
      ) : (
        <>
          <div
            className="absolute rounded-[6px] bg-placeholder-object"
            style={placeholder.object}
          />
          <div
            className="absolute flex items-center justify-center"
            style={placeholder.note}
          >
            <div
              className="rotate-5 bg-brand-yellow-400"
              style={placeholder.noteInner}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MatchThumbnail;
