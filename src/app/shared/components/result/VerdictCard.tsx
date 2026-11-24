import Badge from '@shared/components/ui/Badge';
import { VERDICT_LABEL } from '@shared/constants/verdict';
import { VERDICT_DESCRIPTION, getHoldCopy } from '@shared/constants/resultCopy';
import type { HoldReason, Verdict } from '@shared/types/analysis';

/**
 * R-05 ~ R-09 · AI 합성 의심도 카드
 * 판정 단계에 따라 배지·점수 색·막대가 바뀌고, 판단 보류는 점수 대신 안내 문구를 보여줍니다.
 * 관리자 상세에서도 재사용할 수 있도록 데이터만 props 로 받습니다.
 */
interface VerdictCardProps {
  verdict: Verdict;
  /** 0~100, 판단 보류일 때는 null */
  percent: number | null;
  holdReason?: HoldReason | null;
  className?: string;
}

const SCORE_COLOR: Record<Exclude<Verdict, 'hold'>, string> = {
  danger: 'text-verdict-danger',
  suspicious: 'text-verdict-suspicious',
  safe: 'text-verdict-safe',
};

const BAR_COLOR: Record<Exclude<Verdict, 'hold'>, string> = {
  danger: 'bg-verdict-danger',
  suspicious: 'bg-verdict-suspicious',
  safe: 'bg-verdict-safe',
};

const VerdictCard = ({
  verdict,
  percent,
  holdReason = null,
  className = '',
}: VerdictCardProps) => {
  const shell = `flex flex-col gap-[12px] rounded-[28px] bg-white px-[28px] py-[24px] shadow-card ${className}`;

  const head = (
    <div className="flex items-center gap-[10px]">
      <h2 className="text-[16px] leading-[1.45] font-bold text-neutral-text">
        AI 합성 의심도
      </h2>
      <Badge tone={verdict}>{VERDICT_LABEL[verdict]}</Badge>
    </div>
  );

  if (verdict === 'hold' || percent === null) {
    const copy = getHoldCopy(holdReason);

    return (
      <section className={shell}>
        {head}
        <p className="text-[20px] leading-[1.45] font-bold text-neutral-text-sub">
          {copy.title}
        </p>
        <p className="text-[14px] leading-[1.45] text-neutral-text-sub">
          {copy.description}
        </p>
      </section>
    );
  }

  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <section className={shell}>
      {head}
      <p
        className={`text-[40px] leading-[1.45] font-black ${SCORE_COLOR[verdict]}`}
      >
        {Math.round(clamped)}%
      </p>
      <div
        role="progressbar"
        aria-label="AI 합성 의심도"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clamped)}
        className="h-[10px] w-full overflow-hidden rounded-[5px] bg-neutral-border"
      >
        <div
          className={`h-full origin-left animate-bar-grow rounded-[5px] ${BAR_COLOR[verdict]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <p className="text-[14px] leading-[1.45] text-neutral-text-sub">
        {VERDICT_DESCRIPTION[verdict]}
      </p>
    </section>
  );
};

export default VerdictCard;
