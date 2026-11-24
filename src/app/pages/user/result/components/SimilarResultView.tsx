import PhotoFrame from '@shared/components/result/PhotoFrame';
import TipsCard from '@shared/components/result/TipsCard';
import Badge from '@shared/components/ui/Badge';
import Button from '@shared/components/ui/Button';
import { getSimilarTips } from '@shared/constants/resultCopy';
import { RESULT_DISCLAIMER } from '@shared/constants/userCopy';
import { formatDateTime } from '@shared/utils/format';
import type { Verdict } from '@shared/types/analysis';
import type { SimilarSearchResult } from '@shared/types/userResult';
import {
  ExactMatchItem,
  VisualMatchCard,
} from '@pages/user/result/components/MatchCards';
import ResultTitleRow from '@pages/user/result/components/ResultTitleRow';

/**
 * 4-B 비슷한 이미지 결과 · 4-B-a 결과 없음 · 4-B-b 검색 실패 · 5-B 공유 결과 (기능 2)
 * 기능 1(AI 합성 의심도) 결과와 합치지 않는 독립 화면입니다.
 * - owner: 내 결과
 * - shared: 공유 링크로 연 읽기 전용 결과 ("나도 비슷한 이미지 찾기"만 표시)
 */
interface SimilarResultViewProps {
  result: SimilarSearchResult;
  mode: 'owner' | 'shared';
  sharing?: boolean;
  onShare?: () => void;
  /** owner: 다른 사진으로 찾기 / shared: 나도 비슷한 이미지 찾기 */
  onRestart: () => void;
  /** 같은 사진으로 AI 합성 의심도 확인하기 */
  onCheckAi?: () => void;
  /** 검색 실패 후 다시 찾기 */
  onRetrySearch?: () => void;
}

interface Summary {
  tone: Verdict;
  badge: string;
  heading: string;
  description: string;
}

/** M-01 · M-06 · M-07 검색 요약 */
const getSummary = (result: SimilarSearchResult): Summary => {
  const exact = result.exactMatches.length;
  const visual = result.visualMatches.length;

  if (result.status === 'failed') {
    return {
      tone: 'hold',
      badge: '검색 실패',
      heading: '지금은 이미지를 찾을 수 없어요',
      description:
        '외부 검색 서비스가 응답하지 않아요. 잠시 후 다시 시도해주세요.',
    };
  }

  if (result.status === 'none') {
    return {
      tone: 'safe',
      badge: '발견되지 않음',
      heading: '인터넷에서 같은 사진을 찾지 못했어요',
      description: '공개되지 않은 곳에 올라온 사진까지 확인할 수는 없어요.',
    };
  }

  return {
    tone: exact > 0 ? 'danger' : 'suspicious',
    badge: exact > 0 ? '도용 의심' : '도용 주의',
    heading: `똑같은 사진 ${exact}건, 비슷한 사진 ${visual}건을 찾았어요`,
    description:
      exact > 0
        ? '똑같은 사진이 다른 곳에 먼저 올라와 있어요. 원본 게시글을 직접 확인해보세요.'
        : '비슷한 사진이 다른 곳에 올라와 있어요. 원본 게시글을 직접 확인해보세요.',
  };
};

const SimilarResultView = ({
  result,
  mode,
  sharing = false,
  onShare,
  onRestart,
  onCheckAi,
  onRetrySearch,
}: SimilarResultViewProps) => {
  const isOwner = mode === 'owner';
  const summary = getSummary(result);
  const tips = getSimilarTips(result.status);
  const exactCount = result.exactMatches.length;
  const visualCount = result.visualMatches.length;

  return (
    <>
      <ResultTitleRow
        title={
          isOwner
            ? '비슷한 이미지 찾기 결과'
            : '공유받은 비슷한 이미지 찾기 결과'
        }
        meta={`${formatDateTime(result.searchedAt)} 검색`}
      />

      <div className="flex flex-col gap-[28px] lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-col gap-[16px] lg:w-[600px] lg:shrink-0">
          <p className="text-[16px] leading-[1.45] font-bold text-neutral-text">
            내가 올린 사진
          </p>
          <PhotoFrame imageUrl={result.imageUrl} />
          <TipsCard {...tips} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-[16px]">
          <section className="flex flex-col gap-[10px] rounded-[28px] bg-white px-[28px] py-[24px] shadow-card">
            <div className="flex items-center gap-[10px]">
              <h2 className="text-[16px] leading-[1.45] font-bold text-neutral-text">
                검색 결과
              </h2>
              <Badge tone={summary.tone}>{summary.badge}</Badge>
            </div>
            <p className="text-[22px] leading-[1.45] font-black text-neutral-text">
              {summary.heading}
            </p>
            <p className="text-[14px] leading-[1.45] text-neutral-text-sub">
              {summary.description}
            </p>
          </section>

          {result.status === 'found' ? (
            <>
              {exactCount > 0 && (
                <section className="flex flex-col gap-[12px]">
                  <h3 className="flex items-center gap-[8px] leading-[1.45] font-bold">
                    <span className="text-[17px] text-neutral-text">
                      똑같은 사진
                    </span>
                    <span className="text-[15px] text-verdict-danger">
                      {exactCount}건
                    </span>
                  </h3>
                  <ul className="flex flex-col gap-[12px]">
                    {result.exactMatches.map((item) => (
                      <ExactMatchItem key={item.id} item={item} />
                    ))}
                  </ul>
                </section>
              )}

              {visualCount > 0 && (
                <section className="flex flex-col gap-[12px]">
                  <h3 className="flex items-center gap-[8px] leading-[1.45] font-bold">
                    <span className="text-[17px] text-neutral-text">
                      비슷한 사진
                    </span>
                    <span className="text-[15px] text-verdict-suspicious">
                      {visualCount}건
                    </span>
                  </h3>
                  <ul className="grid grid-cols-1 gap-[12px] sm:grid-cols-3">
                    {result.visualMatches.map((item) => (
                      <VisualMatchCard key={item.id} item={item} />
                    ))}
                  </ul>
                </section>
              )}

              <p className="text-[12px] leading-[1.45] text-neutral-text-muted">
                검색 결과는 외부 이미지 검색 서비스에서 가져온 정보예요. 원본
                보기는 외부 사이트로 이동해요.
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center gap-[8px] rounded-[24px] bg-neutral-bg px-[16px] py-[48px] text-center leading-[1.45]">
              <p className="text-[16px] font-bold text-neutral-text-sub">
                {result.status === 'failed'
                  ? '검색 결과를 불러오지 못했어요'
                  : '똑같은 사진 0건 · 비슷한 사진 0건'}
              </p>
              {result.status === 'failed' && (
                <button
                  type="button"
                  onClick={onRetrySearch}
                  className="cursor-pointer text-[14px] font-bold text-brand-green-500 underline transition-opacity duration-200 hover:opacity-70"
                >
                  다시 찾기
                </button>
              )}
            </div>
          )}

          <div className="flex flex-col gap-[12px] sm:flex-row">
            {isOwner ? (
              <>
                <Button
                  onClick={result.status === 'found' ? onShare : onRestart}
                  disabled={result.status === 'found' && sharing}
                  className="flex-1"
                >
                  {result.status === 'found'
                    ? '결과 링크 공유하기'
                    : '다른 사진으로 찾기'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={onCheckAi}
                  className="flex-1"
                >
                  AI 합성 의심도 확인하기
                </Button>
              </>
            ) : (
              <Button onClick={onRestart} className="flex-1">
                나도 비슷한 이미지 찾기
              </Button>
            )}
          </div>

          <p className="text-[12px] leading-[1.45] text-neutral-text-sub">
            {RESULT_DISCLAIMER}
          </p>
        </div>
      </div>
    </>
  );
};

export default SimilarResultView;
