import type { TipsContent, TipsTone } from '@shared/constants/resultCopy';

/**
 * R-15 · M-05 · 이렇게 해보세요 카드
 * 내용(title/items/tone)은 resultCopy 의 getAiTips / getSimilarTips 로 만듭니다.
 * (관리자 화면에는 노출하지 않는 카드입니다.)
 */
interface TipsCardProps extends TipsContent {
  className?: string;
}

const TONE_CLASS: Record<TipsTone, string> = {
  yellow: 'bg-brand-yellow-100',
  green: 'bg-brand-green-100',
  gray: 'bg-neutral-bg',
};

const TipsCard = ({ title, items, tone, className = '' }: TipsCardProps) => {
  return (
    <section
      className={`flex flex-col gap-[12px] rounded-[28px] px-[28px] py-[24px] leading-[1.45] text-neutral-text ${TONE_CLASS[tone]} ${className}`}
    >
      <h2 className="text-[16px] font-bold">{title}</h2>
      <ul className="flex flex-col gap-[12px] text-[14px]">
        {items.map((item) => (
          <li key={item} className="flex gap-[8px]">
            <span aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TipsCard;
