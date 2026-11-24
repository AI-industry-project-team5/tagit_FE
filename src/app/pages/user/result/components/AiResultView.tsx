import AnalysisPhotoPanel from '@shared/components/result/AnalysisPhotoPanel';
import MemoTextCard from '@shared/components/result/MemoTextCard';
import MetadataCard from '@shared/components/result/MetadataCard';
import TipsCard from '@shared/components/result/TipsCard';
import VerdictCard from '@shared/components/result/VerdictCard';
import Button from '@shared/components/ui/Button';
import {
  getAiTips,
  getHeatmapUnavailableMessage,
} from '@shared/constants/resultCopy';
import { RESULT_DISCLAIMER } from '@shared/constants/userCopy';
import { formatDateTime } from '@shared/utils/format';
import type { AiCheckResult } from '@shared/types/userResult';
import ResultTitleRow from '@pages/user/result/components/ResultTitleRow';

/**
 * 4-A 검증 결과 · 5-A 공유 결과 (기능 1)
 * 결과 카드는 shared/components/result 의 공통 컴포넌트를 조합합니다.
 * - owner: 내 결과 (링크 공유 · 다른 사진 검증 · 기능 2 연결)
 * - shared: 공유 링크로 연 읽기 전용 결과 ("나도 인증샷 검증하기"만 표시)
 */
interface AiResultViewProps {
  result: AiCheckResult;
  mode: 'owner' | 'shared';
  sharing?: boolean;
  onShare?: () => void;
  /** owner: 다른 사진 검증하기 / shared: 나도 인증샷 검증하기 */
  onRestart: () => void;
  onFindSimilar?: () => void;
}

const AiResultView = ({
  result,
  mode,
  sharing = false,
  onShare,
  onRestart,
  onFindSimilar,
}: AiResultViewProps) => {
  const isHold = result.verdict === 'hold';
  const isOwner = mode === 'owner';
  const tips = getAiTips(result.verdict, result.holdReason);

  return (
    <>
      <ResultTitleRow
        title={isOwner ? '검증 결과' : '공유받은 검증 결과'}
        meta={`${formatDateTime(result.analyzedAt)} 분석`}
      />

      <div className="flex flex-col gap-[28px] lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-col gap-[16px] lg:w-[600px] lg:shrink-0">
          <AnalysisPhotoPanel
            // 결과가 바뀌면 보기 방식(원본/히트맵)을 처음 상태로 되돌립니다.
            key={result.analysisId}
            imageUrl={result.imageUrl}
            verdict={result.verdict}
            memoBox={result.memoBox}
            percent={result.suspicionPercent}
            heatmapUrl={result.heatmapUrl}
            heatmapUnavailableMessage={getHeatmapUnavailableMessage(
              result.verdict,
              result.holdReason
            )}
          />
          <TipsCard {...tips} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-[16px]">
          <VerdictCard
            verdict={result.verdict}
            percent={result.suspicionPercent}
            holdReason={result.holdReason}
          />
          <MemoTextCard text={result.ocrText} holdReason={result.holdReason} />
          <MetadataCard metadata={result.metadata} />

          <div className="flex flex-col gap-[12px] sm:flex-row">
            {isOwner ? (
              <>
                {!isHold && (
                  <Button
                    onClick={onShare}
                    disabled={sharing}
                    className="flex-1"
                  >
                    결과 링크 공유하기
                  </Button>
                )}
                <Button
                  variant={isHold ? 'primary' : 'secondary'}
                  onClick={onRestart}
                  className="flex-1"
                >
                  다른 사진 검증하기
                </Button>
              </>
            ) : (
              <Button onClick={onRestart} className="flex-1">
                나도 인증샷 검증하기
              </Button>
            )}
          </div>

          <p className="text-[12px] leading-[1.45] text-neutral-text-sub">
            {RESULT_DISCLAIMER}
          </p>

          {isOwner && (
            <button
              type="button"
              onClick={onFindSimilar}
              className="cursor-pointer self-start text-left text-[14px] leading-[1.45] font-bold text-brand-green-500 underline transition-opacity duration-200 hover:opacity-70"
            >
              이 사진이 다른 곳에 올라온 적 있는지 비슷한 이미지도 찾아보세요 →
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AiResultView;
