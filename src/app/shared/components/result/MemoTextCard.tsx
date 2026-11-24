import { OCR_COPY, isQualityHold } from '@shared/constants/resultCopy';
import type { HoldReason } from '@shared/types/analysis';

/**
 * R-10 · R-11 · 메모에서 읽은 글씨 카드
 * - text 가 있으면 성공, null 이면 인식 실패
 * - 판단 보류(holdReason)일 때는 사유에 맞는 안내를 보여줍니다.
 */
interface MemoTextCardProps {
  text: string | null;
  holdReason?: HoldReason | null;
  className?: string;
}

const MemoTextCard = ({
  text,
  holdReason = null,
  className = '',
}: MemoTextCardProps) => {
  let content: { box: string; boxMuted: boolean; note: string };

  if (holdReason) {
    content = {
      box: isQualityHold(holdReason)
        ? OCR_COPY.holdQualityTitle
        : OCR_COPY.holdMemoTitle,
      boxMuted: true,
      note: OCR_COPY.holdDescription,
    };
  } else if (text) {
    content = { box: text, boxMuted: false, note: OCR_COPY.success };
  } else {
    content = {
      box: OCR_COPY.failedTitle,
      boxMuted: true,
      note: OCR_COPY.failedDescription,
    };
  }

  return (
    <section
      className={`flex flex-col gap-[12px] rounded-[28px] bg-white px-[28px] py-[24px] shadow-card ${className}`}
    >
      <h2 className="text-[16px] leading-[1.45] font-bold text-neutral-text">
        메모에서 읽은 글씨
      </h2>
      <p
        className={`rounded-[12px] bg-neutral-bg px-[16px] py-[12px] text-[18px] leading-[1.45] font-bold whitespace-pre-line ${
          content.boxMuted ? 'text-neutral-text-sub' : 'text-neutral-text'
        }`}
      >
        {content.box}
      </p>
      <p className="text-[13px] leading-[1.45] text-neutral-text-sub">
        {content.note}
      </p>
    </section>
  );
};

export default MemoTextCard;
