import photoUrl from '@shared/assets/mock/photo.svg';
import photoNoMemoUrl from '@shared/assets/mock/photo-no-memo.svg';
import photoBlurryUrl from '@shared/assets/mock/photo-blurry.svg';
import heatmapUrl from '@shared/assets/mock/heatmap.svg';
import type { BoundingBox } from '@shared/types/analysis';
import type {
  AiCheckResult,
  MatchItem,
  MetadataInfo,
  SimilarSearchResult,
} from '@shared/types/userResult';
import type { AiScenario, SimilarScenario } from '@shared/mocks/mockScenarios';

/**
 * 사용자 화면 확인용 Mock 데이터
 * UI 컴포넌트는 이 파일을 직접 import 하지 않고, mockUserApi 를 거쳐
 * 페이지(훅)에서만 주입받습니다. API 연동 시 이 폴더만 교체합니다.
 */

export const MOCK_PHOTO_URL = photoUrl;

/** Figma 4-A 바운딩 박스 위치를 이미지 크기 대비 비율로 환산한 값 */
const MEMO_BOX: BoundingBox = {
  left: 0.515,
  top: 0.428,
  width: 0.332,
  height: 0.424,
};

const OCR_TEXT = '중고왕123\n11.20';

const METADATA_EDITED: MetadataInfo = {
  status: 'edited',
  device: null,
  capturedAt: null,
  editor: 'AI 이미지 편집 도구 기록 발견',
};

const METADATA_MISSING: MetadataInfo = {
  status: 'missing',
  device: null,
  capturedAt: null,
  editor: null,
};

const METADATA_CLEAN: MetadataInfo = {
  status: 'clean',
  device: 'Galaxy S24',
  capturedAt: '2026.11.20 13:58',
  editor: null,
};

const AI_ANALYZED_AT = '2026-11-20T14:32:00';

const baseAiResult = (analysisId: string): AiCheckResult => ({
  analysisId,
  analyzedAt: AI_ANALYZED_AT,
  imageUrl: photoUrl,
  verdict: 'danger',
  holdReason: null,
  suspicionPercent: 87,
  memoBox: MEMO_BOX,
  ocrText: OCR_TEXT,
  heatmapUrl,
  metadata: METADATA_EDITED,
});

export const getAiMockResult = (
  analysisId: string,
  scenario: AiScenario
): AiCheckResult => {
  const base = baseAiResult(analysisId);

  switch (scenario) {
    case 'suspicious':
      return {
        ...base,
        verdict: 'suspicious',
        suspicionPercent: 54,
        metadata: METADATA_MISSING,
      };
    case 'safe':
      return {
        ...base,
        verdict: 'safe',
        suspicionPercent: 12,
        metadata: METADATA_CLEAN,
      };
    case 'hold-memo':
      return {
        ...base,
        imageUrl: photoNoMemoUrl,
        verdict: 'hold',
        holdReason: 'memo_not_found',
        suspicionPercent: null,
        memoBox: null,
        ocrText: null,
        heatmapUrl: null,
      };
    case 'hold-quality':
      return {
        ...base,
        imageUrl: photoBlurryUrl,
        verdict: 'hold',
        holdReason: 'too_blurry',
        suspicionPercent: null,
        memoBox: null,
        ocrText: null,
        heatmapUrl: null,
      };
    case 'ocr-fail':
      return { ...base, ocrText: null };
    case 'heatmap-fail':
      return { ...base, heatmapUrl: null };
    case 'danger':
      return base;
  }
};

const SEARCHED_AT = '2026-11-22T14:40:00';

const EXACT_MATCHES: MatchItem[] = [
  {
    id: 'exact-1',
    thumbnailUrl: null,
    title: '아이폰 15 프로 256GB 팝니다 (박스 풀구성)',
    source: 'example-market.com',
    postedAt: '2026.09.14',
    link: 'https://example.com/',
  },
  {
    id: 'exact-2',
    thumbnailUrl: null,
    title: '아이폰15프로 판매합니다',
    source: 'example-community.net',
    postedAt: '2026.10.02',
    link: 'https://example.com/',
  },
];

const VISUAL_MATCHES: MatchItem[] = [
  {
    id: 'visual-1',
    thumbnailUrl: null,
    title: null,
    source: 'example-blog.com',
    postedAt: null,
    link: 'https://example.com/',
  },
  {
    id: 'visual-2',
    thumbnailUrl: null,
    title: null,
    source: 'example-shop.kr',
    postedAt: null,
    link: 'https://example.com/',
  },
  {
    id: 'visual-3',
    thumbnailUrl: null,
    title: null,
    source: 'example-sns.com',
    postedAt: null,
    link: 'https://example.com/',
  },
];

export const getSimilarMockResult = (
  searchId: string,
  scenario: SimilarScenario
): SimilarSearchResult => {
  const base: SimilarSearchResult = {
    searchId,
    searchedAt: SEARCHED_AT,
    imageUrl: photoUrl,
    status: 'found',
    exactMatches: EXACT_MATCHES,
    visualMatches: VISUAL_MATCHES,
  };

  switch (scenario) {
    case 'similar-only':
      return { ...base, exactMatches: [] };
    case 'none':
      return { ...base, status: 'none', exactMatches: [], visualMatches: [] };
    case 'failed':
      return { ...base, status: 'failed', exactMatches: [], visualMatches: [] };
    case 'exact':
      return base;
  }
};
