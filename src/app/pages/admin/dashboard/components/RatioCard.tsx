import { formatCount, formatRatio } from '@pages/admin/utils/format';

interface RatioCardProps {
  totalCount: number;
  aiCount: number;
  realCount: number;
  /** AI 의심 비율 0~1 (서버 값) */
  aiRatio: number;
  /** 실제 촬영 추정 비율 0~1 (서버 값) */
  realRatio: number;
}

interface CountRowProps {
  label: string;
  count: number;
  valueClassName: string;
}

const CountRow = ({ label, count, valueClassName }: CountRowProps) => (
  <div className="flex items-center justify-between leading-[1.4]">
    <dt className="text-[14px] font-medium text-neutral-text-sub">{label}</dt>
    <dd className="flex items-baseline gap-[3px]">
      <span className={`text-[22px] font-black ${valueClassName}`}>
        {formatCount(count)}
      </span>
      <span className="text-[14px] font-bold text-neutral-text-sub">장</span>
    </dd>
  </div>
);

/** A-01 AI 합성 의심 / 실제 촬영 비율 + 사진 수 */
const RatioCard = ({
  totalCount,
  aiCount,
  realCount,
  aiRatio,
  realRatio,
}: RatioCardProps) => {
  const isEmpty = totalCount === 0;

  return (
    <section className="flex w-full flex-col gap-[28px] rounded-[24px] bg-white px-[36px] py-[32px] shadow-admin-card xl:flex-row xl:items-center xl:gap-[36px]">
      <div className="flex min-w-0 flex-1 flex-col gap-[16px]">
        <h2 className="text-[17px] leading-[1.4] font-bold text-neutral-text">
          AI 합성 의심 / 실제 촬영 비율
        </h2>
        <p className="text-[13px] leading-[1.4] text-neutral-text-sub">
          AI 합성 의심도 확인으로 분석한 사진 기준 · 비슷한 이미지 찾기 사진은
          공유용으로만 7일 보관하고 여기엔 포함하지 않아요
        </p>

        {isEmpty ? (
          <div className="flex h-[44px] items-center justify-center rounded-[14px] bg-neutral-bg text-[14px] font-medium text-neutral-text-muted">
            선택한 기간에 분석된 사진이 없어요
          </div>
        ) : (
          <div
            role="img"
            aria-label={`AI 생성·합성 의심 ${formatRatio(aiRatio)}, 실제 촬영 추정 ${formatRatio(realRatio)}`}
            className="flex h-[44px] origin-left animate-bar-grow gap-[4px] overflow-hidden rounded-[14px]"
          >
            {aiCount > 0 && (
              <div
                className="flex min-w-[72px] items-center bg-verdict-danger pl-[14px]"
                style={{ flexBasis: `${aiRatio * 100}%` }}
              >
                <span className="text-[15px] leading-[1.4] font-black text-white">
                  {formatRatio(aiRatio)}
                </span>
              </div>
            )}
            {realCount > 0 && (
              <div className="flex min-w-[72px] flex-1 items-center justify-end bg-brand-green-300 pr-[16px]">
                <span className="text-[15px] leading-[1.4] font-black text-neutral-text">
                  {formatRatio(realRatio)}
                </span>
              </div>
            )}
          </div>
        )}

        <ul className="flex flex-wrap gap-[20px] text-[13px] leading-[1.4] font-medium text-neutral-text-sub">
          <li className="flex items-center gap-[6px]">
            <span className="size-[10px] rounded-[3px] bg-verdict-danger" />
            AI 생성·합성 의심
          </li>
          <li className="flex items-center gap-[6px]">
            <span className="size-[10px] rounded-[3px] bg-brand-green-300" />
            실제 촬영 추정
          </li>
        </ul>
      </div>

      <div className="h-px w-full shrink-0 bg-neutral-border xl:h-[120px] xl:w-px" />

      <dl className="flex w-full shrink-0 flex-col gap-[14px] xl:w-[320px]">
        <div className="flex items-center justify-between leading-[1.4]">
          <dt className="text-[16px] font-bold text-neutral-text">총 사진</dt>
          <dd className="flex items-baseline gap-[3px]">
            <span className="text-[30px] font-black text-neutral-text">
              {formatCount(totalCount)}
            </span>
            <span className="text-[14px] font-bold text-neutral-text-sub">
              장
            </span>
          </dd>
        </div>
        <div className="h-px w-full bg-neutral-border" />
        <CountRow
          label="AI 생성·합성 의심"
          count={aiCount}
          valueClassName="text-verdict-danger"
        />
        <CountRow
          label="실제 촬영 추정"
          count={realCount}
          valueClassName="text-brand-green-500"
        />
      </dl>
    </section>
  );
};

export default RatioCard;
