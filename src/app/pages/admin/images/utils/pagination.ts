export type PageItem = number | 'ellipsis-start' | 'ellipsis-end';

const MAX_VISIBLE_PAGES = 7;

/**
 * 페이지 번호 목록
 * 처음·마지막·현재 주변만 보여주고 나머지는 '…'로 줄입니다. (예: 1 2 3 … 77)
 */
export const getPageItems = (current: number, total: number): PageItem[] => {
  if (total <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const visible = new Set([1, total, current - 1, current, current + 1]);
  if (current <= 3) [2, 3].forEach((page) => visible.add(page));
  if (current >= total - 2)
    [total - 2, total - 1].forEach((page) => visible.add(page));

  const pages = [...visible]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  return pages.flatMap((page, index): PageItem[] => {
    const prev = pages[index - 1];
    if (prev === undefined || page - prev === 1) return [page];
    // 한 칸만 비면 '…' 대신 그 번호를 보여줍니다.
    if (page - prev === 2) return [prev + 1, page];
    return [index === 1 ? 'ellipsis-start' : 'ellipsis-end', page];
  });
};
