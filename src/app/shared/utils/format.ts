const pad = (value: number) => String(value).padStart(2, '0');

/** ISO 문자열 → "2026.11.20 14:32" */
export const formatDateTime = (iso: string) => {
  const date = new Date(iso);
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

/** ISO 문자열 → "2026년 11월 27일" */
export const formatKoreanDate = (iso: string) => {
  const date = new Date(iso);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

/** 바이트 → "2.4MB" / "320KB" */
export const formatFileSize = (bytes: number) => {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  }
  return `${Math.max(1, Math.round(bytes / 1024))}KB`;
};
