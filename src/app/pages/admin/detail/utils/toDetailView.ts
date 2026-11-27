import { DETAIL_COPY } from '@pages/admin/detail/constants/detailCopy';
import type { DetailView } from '@pages/admin/detail/types/detailView';
import { formatAnalysisId, toPercent } from '@pages/admin/utils/format';
import { formatDateTime } from '@shared/utils/format';
import type { Verdict } from '@shared/types/analysis';
import type {
  AdminEditStatus,
  AdminImageDetailResponse,
  AdminRiskLevel,
} from '@shared/types/admin';
import type { MetadataStatus } from '@shared/types/userResult';

const VERDICT_BY_RISK: Record<AdminRiskLevel, Verdict> = {
  HIGH: 'danger',
  MEDIUM: 'suspicious',
  LOW: 'safe',
};

/** 편집 기록 상태 → 메타데이터 카드 배지 (편집 기록 있음 / 정보 없음 / 특이사항 없음) */
const METADATA_STATUS: Record<AdminEditStatus, MetadataStatus> = {
  EDITED: 'edited',
  NONE: 'missing',
  NOT_EDITED: 'clean',
  UNKNOWN: 'clean',
};

/** 서버 응답 → 상세 화면 데이터 */
export const toDetailView = ({
  id,
  data,
}: AdminImageDetailResponse): DetailView => {
  const percent = toPercent(data.result.probability);
  const { device, capturedAt, editStatus } = data.metadata;

  return {
    id,
    analysisId: formatAnalysisId(id),
    completedAt: data.completedAt,
    imageUrl: data.originalImageUrl,
    // 확률이 없으면 판단 보류로 보여줍니다.
    verdict: percent === null ? 'hold' : VERDICT_BY_RISK[data.result.riskLevel],
    percent,
    memoBox: data.boundingBox,
    heatmapUrl: data.result.overlayImageUrl,
    ocrText: data.ocrStatus === 'COMPLETED' ? data.ocrText : null,
    metadata: {
      status: METADATA_STATUS[editStatus],
      device,
      capturedAt: capturedAt ? formatDateTime(capturedAt) : null,
      editor: editStatus === 'EDITED' ? DETAIL_COPY.editedEditor : null,
    },
    models: data.detail,
  };
};
