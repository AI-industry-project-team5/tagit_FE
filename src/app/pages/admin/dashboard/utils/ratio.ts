/**
 * AI 의심 / 실제 촬영 비율 (소수점 첫째 자리)
 * 두 값의 합이 항상 100.0% 가 되도록 실제 촬영 비율은 나머지로 계산합니다.
 */
export const getRatio = (aiCount: number, totalCount: number) => {
  if (totalCount <= 0) return { aiPercent: 0, realPercent: 0 };

  const aiPercent = Math.round((aiCount / totalCount) * 1000) / 10;
  const realPercent = Math.round((100 - aiPercent) * 10) / 10;
  return { aiPercent, realPercent };
};

export const formatPercent = (percent: number) => `${percent.toFixed(1)}%`;

/** 3927 → "3,927" */
export const formatCount = (count: number) => count.toLocaleString('ko-KR');
