import type { HoldReason, Verdict } from '@shared/types/analysis';
import type { SimilarSearchStatus } from '@shared/types/userResult';

/**
 * 결과 화면 문구 (기능명세 원문 + 최신 Figma 기준)
 * 관리자 상세(A-03)에서도 같은 판정 문구를 재사용할 수 있도록 분리했습니다.
 */

/** 판단 보류 사유 구분 — 메모 미탐지 / 사진 품질 */
export const isQualityHold = (reason: HoldReason | null) =>
  reason === 'low_resolution' || reason === 'too_blurry';

/** R-05 ~ R-07 · AI 합성 의심도 설명 */
export const VERDICT_DESCRIPTION: Record<Exclude<Verdict, 'hold'>, string> = {
  danger: '메모 경계와 조명에서 합성으로 보이는 흔적이 많이 발견됐어요.',
  suspicious: '메모 일부에서 합성이 의심되는 흔적이 있어요.',
  safe: '메모에서 합성 흔적이 거의 발견되지 않았어요.',
};

/** R-08 · R-09 · 판단 보류 카드 문구 */
export const getHoldCopy = (reason: HoldReason | null) =>
  isQualityHold(reason)
    ? {
        title: '사진이 흐리거나 작아서 정확히 분석하기 어려워요',
        description: '판매자에게 원본 사진을 다시 받아 시도해주세요.',
      }
    : {
        title: '사진에서 메모를 찾지 못했어요',
        description:
          '메모가 물건과 함께 잘 보이게 찍힌 사진으로 다시 시도해주세요. 메타데이터는 참고할 수 있어요.',
      };

/** R-10 · R-11 · 메모 글씨 카드 문구 */
export const OCR_COPY = {
  success:
    '판매자 닉네임, 날짜와 같은지 확인해보세요. 손글씨 인식 결과는 실제와 다를 수 있어요.',
  failedTitle: '글씨를 읽지 못했어요',
  failedDescription:
    '사진에서 메모 글씨를 직접 확인해주세요. 다른 분석 결과는 그대로 참고할 수 있어요.',
  holdMemoTitle: '메모를 찾지 못했어요',
  holdQualityTitle: '글씨를 읽기 어려워요',
  holdDescription: '메모가 잘 보이는 사진으로 다시 시도해주세요.',
} as const;

/** R-12 ~ R-14 · 메타데이터 문구 */
export const METADATA_COPY = {
  note: '메신저로 전송된 사진은 메타데이터가 지워질 수 있어 보조 단서로만 활용해요.',
  missingNote:
    '메타데이터가 없어요. 메신저로 전송된 사진은 정보가 지워지는 경우가 많아 의심 근거로 보지 않아요.',
  unknown: '확인 불가',
  noRecord: '기록 없음',
} as const;

/** R-03 · R-04 · 히트맵 안내 */
export const HEATMAP_COPY = {
  guide:
    'AI가 판단할 때 주로 참고한 영역이에요. 정확한 위조 위치를 뜻하지는 않아요.',
  failed:
    '판단 근거 히트맵을 만들지 못했어요. AI 합성 의심도는 정상적으로 분석됐어요.',
  holdMemo: '메모를 찾지 못해 판단 근거 히트맵이 없어요.',
  holdQuality: '사진이 흐려 판단 근거 히트맵을 만들 수 없어요.',
} as const;

export const getHeatmapUnavailableMessage = (
  verdict: Verdict,
  reason: HoldReason | null
) => {
  if (verdict !== 'hold') {
    return HEATMAP_COPY.failed;
  }
  return isQualityHold(reason)
    ? HEATMAP_COPY.holdQuality
    : HEATMAP_COPY.holdMemo;
};

/** R-15 · 이렇게 해보세요 (기능 1) */
export type TipsTone = 'yellow' | 'green' | 'gray';

export interface TipsContent {
  title: string;
  items: string[];
  tone: TipsTone;
}

export const getAiTips = (
  verdict: Verdict,
  reason: HoldReason | null
): TipsContent => {
  switch (verdict) {
    case 'danger':
      return {
        title: '이렇게 해보세요',
        tone: 'yellow',
        items: [
          '다른 각도로 찍은 사진 한 장 더 요청하기',
          '메모를 들고 물건을 비추는 짧은 영상 요청하기',
          '직거래 또는 안전결제로 거래하기',
        ],
      };
    case 'suspicious':
      return {
        title: '이렇게 해보세요',
        tone: 'yellow',
        items: [
          '다른 각도로 찍은 사진 한 장 더 요청하기',
          '안전결제로 거래하기',
        ],
      };
    case 'safe':
      return {
        title: '그래도 거래 전 확인하세요',
        tone: 'green',
        items: [
          '메모 글씨가 판매자 닉네임·날짜와 같은지 확인하기',
          '안전결제 이용하기',
        ],
      };
    case 'hold':
      return {
        title: '다시 찍을 때 확인하세요',
        tone: 'gray',
        items: isQualityHold(reason)
          ? [
              '캡처하거나 여러 번 전송된 사진이 아닌지',
              '초점이 맞고 흔들리지 않았는지',
              '메모 부분이 너무 작게 찍히지 않았는지',
            ]
          : [
              '닉네임·날짜를 적은 메모가 사진 안에 있는지',
              '메모가 손이나 물건에 가려지지 않았는지',
              '메모 글씨가 보일 만큼 가까이 찍었는지',
            ],
      };
  }
};

/** M-05 · M-06 · 이렇게 해보세요 (기능 2) */
export const getSimilarTips = (status: SimilarSearchStatus): TipsContent => {
  switch (status) {
    case 'found':
      return {
        title: '이렇게 해보세요',
        tone: 'yellow',
        items: [
          '판매자에게 지금 직접 찍은 사진을 다시 요청하기',
          '원본 게시글의 날짜와 판매자를 비교하기',
          '직거래 또는 안전결제로 거래하기',
        ],
      };
    case 'none':
      return {
        title: '이렇게 해보세요',
        tone: 'gray',
        items: ['AI 합성 의심도 확인도 함께 해보기', '안전결제로 거래하기'],
      };
    case 'failed':
      return {
        title: '그동안 이렇게 해보세요',
        tone: 'gray',
        items: ['AI 합성 의심도 확인도 함께 해보기', '안전결제로 거래하기'],
      };
  }
};
