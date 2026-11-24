import externalIcon from '@shared/assets/icons/external-link.svg';
import MatchThumbnail from '@pages/user/result/components/MatchThumbnail';
import type { MatchItem } from '@shared/types/userResult';

/**
 * M-02 · M-03 · M-04 · 찾은 이미지 카드
 * "원본 보기"는 외부 게시글을 새 탭으로 엽니다.
 */

const OpenLink = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex shrink-0 items-center gap-[6px] rounded-[18px] border border-neutral-border px-[14px] py-[8px] text-[13px] leading-[1.45] font-bold whitespace-nowrap text-neutral-text transition-all duration-200 hover:border-brand-green-300 hover:bg-brand-green-100"
  >
    원본 보기
    <img src={externalIcon} alt="" className="size-[13px]" />
  </a>
);

/** 똑같은 사진 (exact matches) — 유사도 숫자는 표시하지 않습니다. */
export const ExactMatchItem = ({ item }: { item: MatchItem }) => (
  <li className="flex flex-wrap items-center gap-[16px] rounded-[22px] bg-white py-[14px] pr-[18px] pl-[14px] shadow-card transition-all duration-300 hover:-translate-y-[2px] hover:shadow-feature-selected sm:flex-nowrap">
    <MatchThumbnail imageUrl={item.thumbnailUrl} size="row" />
    <div className="flex min-w-0 flex-1 flex-col items-start gap-[4px] leading-[1.45]">
      <span className="rounded-[10px] bg-verdict-danger-bg px-[8px] py-[2px] text-[11px] font-bold text-verdict-danger">
        똑같은 사진
      </span>
      {item.title && (
        <p className="text-[15px] font-bold text-neutral-text">{item.title}</p>
      )}
      <p className="text-[12px] text-neutral-text-sub">
        {item.source}
        {item.postedAt ? ` · ${item.postedAt} 게시` : ''}
      </p>
    </div>
    <OpenLink href={item.link} />
  </li>
);

/** 비슷한 사진 (visual matches) — 카드 그리드 */
export const VisualMatchCard = ({ item }: { item: MatchItem }) => (
  <li className="flex min-w-0 flex-col items-start gap-[8px] rounded-[20px] bg-white px-[12px] pt-[12px] pb-[14px] shadow-card transition-all duration-300 hover:-translate-y-[2px] hover:shadow-feature-selected">
    <MatchThumbnail imageUrl={item.thumbnailUrl} size="card" />
    <p className="text-[13px] leading-[1.45] font-medium text-neutral-text">
      {item.source}
    </p>
    <OpenLink href={item.link} />
  </li>
);
