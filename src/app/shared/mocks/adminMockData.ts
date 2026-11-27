import photoUrl from '@shared/assets/mock/photo.svg';
import type {
  AdminDashboardResponse,
  AdminEditStatus,
  AdminImageItem,
  AdminImageListParams,
  AdminImageListResponse,
  AdminOcrStatus,
  AdminPeriod,
} from '@shared/types/admin';

/**
 * 관리자 화면 확인용 Mock 데이터 (API 명세서 v2 응답 형식)
 * UI 컴포넌트는 이 파일을 직접 import 하지 않고, mockAdminApi 를 거쳐
 * 페이지(훅)에서만 주입받습니다. API 연동 시 이 파일들만 교체합니다.
 */

/** 기간별 집계 (최근 7일은 Figma A-01 수치) */
const COUNTS: Record<AdminPeriod, { total: number; ai: number }> = {
  today: { total: 128, ai: 21 },
  '7d': { total: 3927, ai: 612 },
  all: { total: 12480, ai: 1873 },
};

const BASE_TIME = new Date('2026-11-20T14:10:00+09:00').getTime();
const RECENT_LIMIT = 4;

/** 기간 안에 분석 시각이 고르게 들어오도록 이미지 사이 간격(초) */
const INTERVAL_SECONDS: Record<AdminPeriod, number> = {
  today: 360,
  '7d': 150,
  all: 400,
};

/** 편집 기록·글씨 인식 상태 조합 (태그 4종이 골고루 보이도록) */
const STATUS_PATTERN: ReadonlyArray<[AdminEditStatus, AdminOcrStatus]> = [
  ['EDITED', 'COMPLETED'],
  ['NOT_EDITED', 'FAILED'],
  ['NONE', 'COMPLETED'],
  ['EDITED', 'NO_TEXT'],
  ['NOT_EDITED', 'COMPLETED'],
  ['NONE', 'SKIPPED'],
  ['NOT_EDITED', 'NO_TEXT'],
  ['UNKNOWN', 'COMPLETED'],
];

/** id 로 항상 같은 값을 내는 0~1 난수 */
const seeded = (id: number) => ((id * 9301 + 49297) % 233280) / 233280;

const roundTo = (value: number, digits: number) =>
  Math.round(value * 10 ** digits) / 10 ** digits;

interface MockImage extends AdminImageItem {
  isAi: boolean;
}

const createImages = (period: AdminPeriod): MockImage[] => {
  const { total, ai } = COUNTS[period];
  const startId = Math.max(3921, total);

  return Array.from({ length: total }, (_, index) => {
    const id = startId - index;
    // AI 의심 이미지를 전체에 고르게 섞어 정확히 ai 장이 되도록 배치
    const isAi =
      Math.floor(((index + 1) * ai) / total) > Math.floor((index * ai) / total);
    const random = seeded(id);
    const [editStatus, ocrStatus] = STATUS_PATTERN[id % STATUS_PATTERN.length];

    return {
      id,
      job_id: `9f1c2d7e-0000-4000-8000-${String(id).padStart(12, '0')}`,
      // 일부는 삭제된 이미지(썸네일 없음)로
      thumbnail_url: id % 23 === 0 ? null : photoUrl,
      probability: roundTo(
        isAi ? 0.5 + random * 0.49 : 0.01 + random * 0.48,
        3
      ),
      edit_status: editStatus,
      ocr_status: ocrStatus,
      completed_at: new Date(
        BASE_TIME - index * INTERVAL_SECONDS[period] * 1000
      ).toISOString(),
      isAi,
    };
  });
};

const cache = new Map<AdminPeriod, MockImage[]>();

const getImages = (period: AdminPeriod) => {
  const cached = cache.get(period);
  if (cached) return cached;

  const images = createImages(period);
  cache.set(period, images);
  return images;
};

const toItem = (image: MockImage): AdminImageItem => ({
  id: image.id,
  job_id: image.job_id,
  thumbnail_url: image.thumbnail_url,
  probability: image.probability,
  edit_status: image.edit_status,
  ocr_status: image.ocr_status,
  completed_at: image.completed_at,
});

const getRatio = (count: number, total: number) =>
  total > 0 ? roundTo(count / total, 3) : 0;

export const getDashboardMock = (
  period: AdminPeriod
): AdminDashboardResponse => {
  const { total, ai } = COUNTS[period];
  const images = getImages(period);
  const real = total - ai;

  const recent = (isAi: boolean) =>
    images
      .filter((image) => image.isAi === isAi)
      .slice(0, RECENT_LIMIT)
      .map(({ id, job_id, thumbnail_url, probability }) => ({
        id,
        job_id,
        thumbnail_url,
        probability,
      }));

  return {
    period,
    summary: {
      total_count: total,
      ai_suspected_count: ai,
      ai_suspected_ratio: getRatio(ai, total),
      real_estimated_count: real,
      real_estimated_ratio: getRatio(real, total),
    },
    recent_ai_suspected: recent(true),
    recent_real_estimated: recent(false),
  };
};

/** 분석된 사진이 하나도 없는 경우 */
export const getEmptyDashboardMock = (
  period: AdminPeriod
): AdminDashboardResponse => ({
  period,
  summary: {
    total_count: 0,
    ai_suspected_count: 0,
    ai_suspected_ratio: 0,
    real_estimated_count: 0,
    real_estimated_ratio: 0,
  },
  recent_ai_suspected: [],
  recent_real_estimated: [],
});

/** '#A-3921', 'a-3921', '3921' → 3921 (알 수 없는 형식이면 null) */
const parseSearchId = (q: string) => {
  const match = /^#?(?:a-)?(\d+)$/i.exec(q.trim());
  return match ? Number(match[1]) : null;
};

const compareBySort = (
  sort: AdminImageListParams['sort']
): ((a: MockImage, b: MockImage) => number) => {
  const time = (image: MockImage) => Date.parse(image.completed_at);
  const score = (image: MockImage) => image.probability ?? -1;

  switch (sort) {
    case 'ai_score_desc':
      return (a, b) => score(b) - score(a);
    case 'ai_score_asc':
      return (a, b) => score(a) - score(b);
    case 'created_at_desc':
      return (a, b) => time(b) - time(a);
    case 'created_at_asc':
      return (a, b) => time(a) - time(b);
  }
};

export const getImageListMock = (
  params: AdminImageListParams,
  empty = false
): AdminImageListResponse => {
  const { category, period, q, sort, page, size } = params;
  const { total, ai } = empty ? { total: 0, ai: 0 } : COUNTS[period];
  const isAi = category === 'ai_suspected';
  const categoryCount = isAi ? ai : total - ai;

  let images = empty
    ? []
    : getImages(period).filter((image) => image.isAi === isAi);

  if (q?.trim()) {
    const searchId = parseSearchId(q);
    images = images.filter((image) => image.id === searchId);
  }

  const sorted = [...images].sort(compareBySort(sort));
  const totalPages = Math.ceil(sorted.length / size);

  return {
    period,
    category,
    counts: {
      total_count: total,
      ai_suspected_count: ai,
      real_estimated_count: total - ai,
      category_ratio: getRatio(categoryCount, total),
    },
    pagination: {
      page,
      size,
      total_items: sorted.length,
      total_pages: totalPages,
    },
    items: sorted.slice((page - 1) * size, page * size).map(toItem),
  };
};
