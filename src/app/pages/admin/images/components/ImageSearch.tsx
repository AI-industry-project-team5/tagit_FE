import { useState } from 'react';
import type { FormEvent } from 'react';
import searchIcon from '@shared/assets/icons/search.svg';

interface ImageSearchProps {
  /** 주소에 있는 현재 검색어 */
  value: string;
  onSearch: (query: string) => void;
}

/**
 * 분석 ID 검색 — Enter 로 검색하고, 입력을 지우면 검색을 해제합니다.
 * '#A-3921', 'A-3921', '3921' 모두 검색할 수 있습니다.
 */
const ImageSearch = ({ value, onSearch }: ImageSearchProps) => {
  const [draft, setDraft] = useState(value);
  const [syncedValue, setSyncedValue] = useState(value);

  // 탭 이동·뒤로 가기 등으로 주소의 검색어가 바뀌면 입력값도 맞춥니다.
  if (value !== syncedValue) {
    setSyncedValue(value);
    setDraft(value);
  }

  const handleChange = (next: string) => {
    setDraft(next);
    // 입력을 모두 지우면(✕ 버튼 포함) 바로 검색을 해제합니다.
    if (next === '' && value) onSearch('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(draft);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`flex w-[240px] items-center gap-[8px] rounded-[14px] border bg-white px-[14px] py-[10px] transition-[border-color,box-shadow] duration-200 focus-within:border-brand-green-500 focus-within:shadow-[inset_0_0_0_1px_var(--color-brand-green-500)] ${
        value ? 'border-brand-green-500' : 'border-neutral-border'
      }`}
    >
      <img src={searchIcon} alt="" width={16} height={16} />
      <input
        type="search"
        value={draft}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="분석 ID 검색"
        aria-label="분석 ID 검색"
        enterKeyHint="search"
        className="min-w-0 flex-1 bg-transparent text-[14px] leading-[1.45] text-neutral-text outline-none placeholder:text-neutral-text-muted focus-visible:outline-none"
      />
    </form>
  );
};

export default ImageSearch;
