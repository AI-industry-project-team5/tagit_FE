import type { Verdict } from '@shared/types/analysis';

export const VERDICT_LABEL: Record<Verdict, string> = {
  safe: '안전',
  suspicious: '의심',
  danger: '위험',
  hold: '판단 보류',
};

export const DISCLAIMER_TEXT =
  '참고용 분석 결과이며, 판매자를 사기로 단정하지 않습니다.';
