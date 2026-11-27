import { useEffect, useId, useRef, useState } from 'react';

export interface AdminSelectOption<T extends string> {
  value: T;
  label: string;
}

interface AdminSelectProps<T extends string> {
  /** 스크린 리더용 이름 (예: '기간') */
  label: string;
  value: T;
  options: readonly AdminSelectOption<T>[];
  onChange: (value: T) => void;
  /** 버튼 크기 (Figma Date Filter: md, Sort: sm) */
  size?: 'sm' | 'md';
}

/**
 * 관리자 드롭다운 (Figma Date Filter · Sort)
 * - 펼친 목록은 디자인에 없어 같은 카드 스타일로 구성했습니다.
 * - 바깥 클릭·Esc 로 닫히고, 선택하면 닫힙니다.
 */
const AdminSelect = <T extends string>({
  label,
  value,
  options,
  onChange,
  size = 'md',
}: AdminSelectProps<T>) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? '';

  const select = (next: T) => {
    onChange(next);
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={`${label}: ${selectedLabel}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-[8px] rounded-[14px] border border-neutral-border bg-white py-[10px] leading-[1.45] font-bold whitespace-nowrap transition-colors duration-200 hover:bg-neutral-bg ${size === 'md' ? 'px-[16px]' : 'px-[14px]'}`}
      >
        <span className="text-[14px] text-neutral-text">{selectedLabel}</span>
        <span
          aria-hidden="true"
          className={`text-[12px] text-neutral-text-sub transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={`${label} 선택`}
          className="absolute top-[calc(100%+6px)] right-0 z-20 flex min-w-full animate-fade-in flex-col gap-[2px] rounded-[14px] border border-neutral-border bg-white p-[6px] shadow-feature"
        >
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <li key={option.value} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => select(option.value)}
                  className={`w-full rounded-[10px] px-[12px] py-[8px] text-left text-[14px] leading-[1.45] whitespace-nowrap transition-colors duration-200 ${
                    selected
                      ? 'bg-brand-green-100 font-bold text-brand-green-500'
                      : 'font-medium text-neutral-text hover:bg-neutral-bg'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AdminSelect;
