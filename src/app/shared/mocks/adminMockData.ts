import photoUrl from '@shared/assets/mock/photo.svg';
import heatmapUrl from '@shared/assets/mock/heatmap.svg';
import type {
  AdminDashboardResponse,
  AdminEditStatus,
  AdminImageDetailResponse,
  AdminImageItem,
  AdminImageListParams,
  AdminImageListResponse,
  AdminOcrStatus,
  AdminPeriod,
  AdminRiskLevel,
} from '@shared/types/admin';

/**
 * 관리자 화면 확인용 Mock 데이터 (API 명세서 v2 응답 형식)
 * UI 컴포넌트는 이 파일을 직접 import 하지 않고, mockAdminApi 를 거쳐
 * 페이지(훅)에서만 주입받습니다. API 연동 시 이 파일들만 교체합니다.
 *
 * 전체 이미지 한 벌을 만들고, 기간은 그중 최근 N장으로 나눕니다.
 * 그래서 같은 분석 번호는 목록·대시보드·상세 어디서든 같은 값입니다.
 */

/**
 * 기간별 누적 집계 (최근 7일은 Figma A-01 수치)
 * 각 구간 안에서 AI 의심 이미지를 고르게 섞어 정확한 장수가 되도록 배치합니다.
 */
const SEGMENTS: ReadonlyArray<{
  period: AdminPeriod;
  total: number;
  ai: number;
  /** 구간이 끝나는 시점 (기준 시각으로부터 초) */
  spanSeconds: number;
}> = [
  { period: 'today', total: 128, ai: 21, spanSeconds: 13 * 3600 },
  { period: '7d', total: 3927, ai: 612, spanSeconds: 7 * 86400 },
  { period: 'all', total: 12480, ai: 1873, spanSeconds: 60 * 86400 },
];

const TOTAL_COUNT = SEGMENTS[SEGMENTS.length - 1].total;
const BASE_TIME = new Date('2026-11-20T14:10:00+09:00').getTime();
const RECENT_LIMIT = 4;

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
const seeded = (id: number, salt = 0) =>
  (((id + salt * 7919) * 9301 + 49297) % 233280) / 233280;

const roundTo = (value: number, digits: number) =>
  Math.round(value * 10 ** digits) / 10 ** digits;

const getCounts = (period: AdminPeriod) => {
  const segment = SEGMENTS.find((item) => item.period === period);
  return { total: segment?.total ?? 0, ai: segment?.ai ?? 0 };
};

interface MockImage extends AdminImageItem {
  isAi: boolean;
}

const createImage = (index: number): MockImage => {
  const segmentIndex = SEGMENTS.findIndex((item) => index < item.total);
  const segment = SEGMENTS[segmentIndex];
  const prev = SEGMENTS[segmentIndex - 1] ?? {
    total: 0,
    ai: 0,
    spanSeconds: 0,
  };

  const count = segment.total - prev.total;
  const aiCount = segment.ai - prev.ai;
  const position = index - prev.total;
  const isAi =
    Math.floor(((position + 1) * aiCount) / count) >
    Math.floor((position * aiCount) / count);

  const id = TOTAL_COUNT - index;
  const random = seeded(id);
  const [editStatus, ocrStatus] = STATUS_PATTERN[id % STATUS_PATTERN.length];
  const seconds =
    prev.spanSeconds +
    ((segment.spanSeconds - prev.spanSeconds) * position) / count;

  return {
    id,
    job_id: `9f1c2d7e-0000-4000-8000-${String(id).padStart(12, '0')}`,
    // 일부는 삭제된 이미지(썸네일 없음)로
    thumbnail_url: id % 23 === 0 ? null : photoUrl,
    probability: roundTo(isAi ? 0.5 + random * 0.49 : 0.01 + random * 0.48, 3),
    edit_status: editStatus,
    ocr_status: ocrStatus,
    completed_at: new Date(
      BASE_TIME - Math.round(seconds) * 1000
    ).toISOString(),
    isAi,
  };
};

let allImages: MockImage[] | null = null;

/** 최신순 전체 이미지 (처음 한 번만 만듭니다) */
const getAllImages = () => {
  allImages ??= Array.from({ length: TOTAL_COUNT }, (_, index) =>
    createImage(index)
  );
  return allImages;
};

const getImages = (period: AdminPeriod) =>
  getAllImages().slice(0, getCounts(period).total);

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
  const { total, ai } = getCounts(period);
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
  const { total, ai } = empty ? { total: 0, ai: 0 } : getCounts(period);
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

/** Figma 4-A·A-03 바운딩 박스 위치 (이미지 크기 대비 비율) */
const MEMO_BOX = { left: 0.515, top: 0.428, width: 0.332, height: 0.424 };

const OCR_TEXT = '중고왕123\n11.20';

const getRiskLevel = (probability: number): AdminRiskLevel => {
  if (probability >= 0.7) return 'HIGH';
  if (probability >= 0.4) return 'MEDIUM';
  return 'LOW';
};

const clampProbability = (value: number) =>
  roundTo(Math.min(0.999, Math.max(0.001, value)), 3);

/**
 * GET /images/{id} — 없는 분석 번호면 null
 * id(3921) 와 job_id 둘 다로 찾을 수 있습니다.
 */
export const getImageDetailMock = (
  key: string
): AdminImageDetailResponse | null => {
  const image = getAllImages().find(
    (item) => String(item.id) === key || item.job_id === key
  );
  if (!image) return null;

  const probability = image.probability ?? 0;
  const hasMetadata = image.edit_status !== 'NONE';
  // 편집된 사진·메타데이터 없음은 기기·일시를 확인할 수 없음 (Figma A-03)
  const hasCaptureInfo = hasMetadata && image.edit_status !== 'EDITED';

  return {
    id: image.id,
    job_id: image.job_id,
    step: 'COMPLETED',
    status: 'SUCCESS',
    data: {
      completedAt: image.completed_at,
      // 목록 썸네일이 없는(삭제된) 이미지는 원본도 없음
      originalImageUrl: image.thumbnail_url === null ? null : photoUrl,
      metadata: {
        device: hasCaptureInfo ? 'Galaxy S24' : null,
        capturedAt: hasCaptureInfo
          ? new Date(
              Date.parse(image.completed_at) - 12 * 60 * 1000
            ).toISOString()
          : null,
        editStatus: image.edit_status,
      },
      boundingBox: MEMO_BOX,
      ocrText: image.ocr_status === 'COMPLETED' ? OCR_TEXT : null,
      result: {
        riskLevel: getRiskLevel(probability),
        probability,
        // 일부는 히트맵 생성 실패(AD-k)로
        overlayImageUrl: image.id % 5 === 0 ? null : heatmapUrl,
        reason: null,
      },
      ocrStatus: image.ocr_status,
      detail: {
        detection: roundTo(0.9 + seeded(image.id, 1) * 0.09, 3),
        classification: probability,
        pytorch: clampProbability(
          probability + (seeded(image.id, 2) - 0.5) * 0.3
        ),
      },
    },
  };
};
