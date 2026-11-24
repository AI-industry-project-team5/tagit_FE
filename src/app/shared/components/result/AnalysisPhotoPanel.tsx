import { useState } from 'react';
import PhotoFrame from '@shared/components/result/PhotoFrame';
import { HEATMAP_COPY } from '@shared/constants/resultCopy';
import { VERDICT_LABEL } from '@shared/constants/verdict';
import type { BoundingBox, Verdict } from '@shared/types/analysis';

/**
 * R-01 ~ R-04 · 사진 + 메모 바운딩 박스 + 원본/히트맵 전환
 * 사용자 결과·공유 결과·관리자 상세에서 함께 쓸 수 있도록 데이터만 props 로 받습니다.
 */
interface AnalysisPhotoPanelProps {
  imageUrl: string;
  verdict: Verdict;
  /** 메모 영역 (이미지 크기 대비 0~1 비율, 없으면 박스를 그리지 않음) */
  memoBox: BoundingBox | null;
  /** 박스 라벨에 표시할 위험 % */
  percent: number | null;
  /** 히트맵 이미지 (없으면 히트맵 버튼 비활성) */
  heatmapUrl: string | null;
  /** 히트맵이 없을 때 보여줄 안내 문구 */
  heatmapUnavailableMessage?: string;
  className?: string;
}

type ViewMode = 'original' | 'heatmap';

const BOX_COLOR: Record<Verdict, string> = {
  danger: 'border-verdict-danger',
  suspicious: 'border-verdict-suspicious',
  safe: 'border-verdict-safe',
  hold: 'border-verdict-hold',
};

const LABEL_COLOR: Record<Verdict, string> = {
  danger: 'bg-verdict-danger',
  suspicious: 'bg-verdict-suspicious',
  safe: 'bg-verdict-safe',
  hold: 'bg-verdict-hold',
};

const toPercent = (value: number) => `${value * 100}%`;

/** Figma 에서 박스(199×199) 대비 히트맵(300×260)이 퍼지는 비율 */
const heatmapRect = (box: BoundingBox) => ({
  left: toPercent(box.left - box.width * 0.253),
  top: toPercent(box.top - box.height * 0.1526),
  width: toPercent(box.width * 1.506),
  height: toPercent(box.height * 1.305),
});

const AnalysisPhotoPanel = ({
  imageUrl,
  verdict,
  memoBox,
  percent,
  heatmapUrl,
  heatmapUnavailableMessage = HEATMAP_COPY.failed,
  className = '',
}: AnalysisPhotoPanelProps) => {
  const heatmapAvailable = Boolean(heatmapUrl && memoBox);
  const [mode, setMode] = useState<ViewMode>(
    heatmapAvailable ? 'heatmap' : 'original'
  );
  const showHeatmap = mode === 'heatmap' && heatmapAvailable;

  return (
    <div className={`flex flex-col gap-[16px] ${className}`}>
      <PhotoFrame imageUrl={imageUrl}>
        {showHeatmap && memoBox && heatmapUrl && (
          <img
            src={heatmapUrl}
            alt=""
            className="pointer-events-none absolute mix-blend-multiply"
            style={heatmapRect(memoBox)}
          />
        )}
        {memoBox && (
          <>
            <div
              className={`absolute rounded-[6px] border-4 ${BOX_COLOR[verdict]}`}
              style={{
                left: toPercent(memoBox.left),
                top: toPercent(memoBox.top),
                width: toPercent(memoBox.width),
                height: toPercent(memoBox.height),
              }}
            />
            <span
              className={`absolute -translate-y-[calc(100%+5px)] rounded-[6px] px-[10px] py-[4px] text-[13px] leading-[1.45] font-bold whitespace-nowrap text-white ${LABEL_COLOR[verdict]}`}
              style={{
                left: toPercent(memoBox.left),
                top: toPercent(memoBox.top),
              }}
            >
              메모 · {VERDICT_LABEL[verdict]}
              {percent !== null ? ` ${Math.round(percent)}%` : ''}
            </span>
          </>
        )}
      </PhotoFrame>

      <div className="flex flex-wrap items-center justify-between gap-x-[16px] gap-y-[8px]">
        <div
          role="tablist"
          aria-label="사진 보기 방식"
          className="flex items-start gap-[4px] rounded-[26px] bg-neutral-bg p-[5px]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!showHeatmap}
            onClick={() => setMode('original')}
            className={`rounded-[22px] px-[18px] py-[9px] text-[14px] leading-[1.45] transition-all duration-200 ${
              !showHeatmap
                ? 'bg-white font-bold text-neutral-text shadow-segment'
                : 'font-medium text-neutral-text-sub'
            }`}
          >
            원본 사진
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={showHeatmap}
            disabled={!heatmapAvailable}
            onClick={() => setMode('heatmap')}
            className={`rounded-[22px] px-[18px] py-[9px] text-[14px] leading-[1.45] transition-all duration-200 ${
              showHeatmap
                ? 'bg-white font-bold text-neutral-text shadow-segment'
                : heatmapAvailable
                  ? 'font-medium text-neutral-text-sub'
                  : 'cursor-not-allowed font-medium text-neutral-text-muted'
            }`}
          >
            판단 근거 히트맵
          </button>
        </div>

        {showHeatmap && (
          <div className="flex items-center gap-[10px] text-[12px] leading-[1.45] font-medium text-neutral-text-sub">
            <span>낮음</span>
            <span
              aria-hidden="true"
              className="h-[8px] w-[160px] rounded-[4px] bg-gradient-to-r from-[#fff299] via-[#ff8c1a] to-[#f03333]"
            />
            <span>높음</span>
          </div>
        )}
      </div>

      {showHeatmap ? (
        <p className="text-[13px] leading-[1.45] text-neutral-text-sub">
          {HEATMAP_COPY.guide}
        </p>
      ) : (
        !heatmapAvailable && (
          <p className="text-[13px] leading-[1.45] text-neutral-text-sub">
            {heatmapUnavailableMessage}
          </p>
        )
      )}
    </div>
  );
};

export default AnalysisPhotoPanel;
