import { getPageItems } from '@pages/admin/images/utils/pagination';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const ITEM_CLASS =
  'flex size-[36px] items-center justify-center rounded-[12px] text-[14px] leading-[1.45] font-bold';

const BUTTON_CLASS = `${ITEM_CLASS} bg-white text-neutral-text-sub transition-colors duration-200 hover:bg-neutral-border disabled:cursor-default disabled:opacity-40 disabled:hover:bg-white`;

/** 페이지 이동 (‹ 1 2 3 … 77 ›) */
const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="페이지 이동"
      className="flex w-full items-center justify-center gap-[6px]"
    >
      <button
        type="button"
        aria-label="이전 페이지"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={BUTTON_CLASS}
      >
        ‹
      </button>

      {getPageItems(page, totalPages).map((item) =>
        typeof item === 'number' ? (
          <button
            key={item}
            type="button"
            aria-label={`${item}페이지`}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onChange(item)}
            className={
              item === page
                ? `${ITEM_CLASS} bg-brand-green-500 text-white`
                : BUTTON_CLASS
            }
          >
            {item}
          </button>
        ) : (
          <span
            key={item}
            aria-hidden="true"
            className={`${ITEM_CLASS} bg-white text-neutral-text-sub`}
          >
            …
          </span>
        )
      )}

      <button
        type="button"
        aria-label="다음 페이지"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className={BUTTON_CLASS}
      >
        ›
      </button>
    </nav>
  );
};

export default Pagination;
