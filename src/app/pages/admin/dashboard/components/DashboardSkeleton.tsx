/** 대시보드 불러오는 중 — 카드 모양 스켈레톤 */
const DashboardSkeleton = () => {
  return (
    <div
      role="status"
      aria-label="대시보드를 불러오는 중"
      className="flex w-full animate-pulse flex-col gap-[24px]"
    >
      <div className="flex w-full flex-col gap-[16px] rounded-[24px] bg-white px-[36px] py-[32px] shadow-admin-card">
        <div className="h-[22px] w-[220px] rounded-[8px] bg-neutral-border" />
        <div className="h-[16px] w-3/4 rounded-[8px] bg-neutral-bg" />
        <div className="h-[44px] w-full rounded-[14px] bg-neutral-bg" />
        <div className="h-[16px] w-[200px] rounded-[8px] bg-neutral-bg" />
      </div>
      <div className="flex w-full flex-col gap-[16px] lg:flex-row">
        {[0, 1].map((key) => (
          <div
            key={key}
            className="flex flex-1 flex-col gap-[16px] rounded-[24px] bg-white px-[28px] py-[24px] shadow-admin-card"
          >
            <div className="h-[22px] w-[160px] rounded-[8px] bg-neutral-border" />
            <div className="grid grid-cols-4 gap-[12px]">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[96px] rounded-[16px] bg-neutral-bg"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
