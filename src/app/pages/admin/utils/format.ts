/** 3927 → "3,927" */
export const formatCount = (count: number) => count.toLocaleString('ko-KR');

/** 비율 0~1 → "15.6%" (소수점 첫째 자리) */
export const formatRatio = (ratio: number) => `${(ratio * 100).toFixed(1)}%`;

/** AI 확률 0~1 → 정수 % (판단 불가면 null) */
export const toPercent = (probability: number | null) =>
  probability === null ? null : Math.round(probability * 100);

/** 3921 → "A-3921" */
export const formatAnalysisId = (id: number) => `A-${id}`;

const DATE_TIME_FORMAT = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

/** UTC ISO 시각 → 한국 시간 "11.20 14:10" */
export const formatDateTime = (iso: string) => {
  const parts = Object.fromEntries(
    DATE_TIME_FORMAT.formatToParts(new Date(iso)).map(({ type, value }) => [
      type,
      value,
    ])
  );
  return `${parts.month}.${parts.day} ${parts.hour}:${parts.minute}`;
};
