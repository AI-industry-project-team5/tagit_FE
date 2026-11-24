import type { ReactNode } from 'react';
import type { Verdict } from '@shared/types/analysis';

/** Figma Badge/* — 판정·검색 결과 배지 */
interface BadgeProps {
  tone: Verdict;
  children: ReactNode;
}

const TONE_CLASS: Record<Verdict, string> = {
  safe: 'bg-verdict-safe-bg text-verdict-safe',
  suspicious: 'bg-verdict-suspicious-bg text-verdict-suspicious',
  danger: 'bg-verdict-danger-bg text-verdict-danger',
  hold: 'bg-verdict-hold-bg text-verdict-hold',
};

const Badge = ({ tone, children }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-start rounded-[20px] px-[12px] py-[4px] text-[13px] leading-[1.45] font-bold whitespace-nowrap ${TONE_CLASS[tone]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
