/** 검증 결과 상세 불러오는 중 — 사진 + 카드 모양 스켈레톤 */
const DetailSkeleton = () => {
  return (
    <div
      role="status"
      aria-label="검증 결과를 불러오는 중"
      className="flex w-full animate-pulse flex-col gap-[28px] xl:flex-row xl:items-start"
    >
      <div className="flex min-w-0 flex-col gap-[16px] xl:w-[600px] xl:shrink-0">
        <div className="aspect-[600/470] w-full rounded-[24px] bg-neutral-border" />
        <div className="h-[46px] w-[260px] rounded-[26px] bg-white" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[16px]">
        {[140, 120, 130, 160].map((height) => (
          <div
            key={height}
            className="w-full rounded-[28px] bg-white"
            style={{ height }}
          />
        ))}
      </div>
    </div>
  );
};

export default DetailSkeleton;
