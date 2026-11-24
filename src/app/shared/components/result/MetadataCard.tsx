import Badge from '@shared/components/ui/Badge';
import { METADATA_COPY } from '@shared/constants/resultCopy';
import type { MetadataInfo, MetadataStatus } from '@shared/types/userResult';

/**
 * R-12 ~ R-14 · 메타데이터 카드 (보조 단서, 점수에 반영하지 않음)
 */
interface MetadataCardProps {
  metadata: MetadataInfo;
  className?: string;
}

const BADGE: Record<MetadataStatus, { tone: 'safe' | 'hold'; label: string }> =
  {
    clean: { tone: 'safe', label: '특이사항 없음' },
    edited: { tone: 'hold', label: '보조 단서' },
    missing: { tone: 'hold', label: '정보 없음' },
  };

interface RowProps {
  label: string;
  value: string | null;
  /** 값이 없을 때 대신 보여줄 문구 */
  fallback?: string;
  tone?: 'default' | 'warning';
}

const Row = ({
  label,
  value,
  fallback = METADATA_COPY.unknown,
  tone = 'default',
}: RowProps) => {
  const valueClass = !value
    ? 'text-neutral-text-muted'
    : tone === 'warning'
      ? 'text-verdict-suspicious'
      : 'text-neutral-text';

  return (
    <div className="flex items-start justify-between gap-[16px] text-[14px] leading-[1.45]">
      <dt className="shrink-0 text-neutral-text-sub">{label}</dt>
      <dd className={`text-right font-bold ${valueClass}`}>
        {value ?? fallback}
      </dd>
    </div>
  );
};

const MetadataCard = ({ metadata, className = '' }: MetadataCardProps) => {
  const badge = BADGE[metadata.status];
  const isEdited = metadata.status === 'edited';

  return (
    <section
      className={`flex flex-col gap-[12px] rounded-[28px] bg-white px-[28px] py-[24px] shadow-card ${className}`}
    >
      <div className="flex items-center gap-[10px]">
        <h2 className="text-[16px] leading-[1.45] font-bold text-neutral-text">
          메타데이터
        </h2>
        <Badge tone={badge.tone}>{badge.label}</Badge>
      </div>
      <dl className="flex flex-col gap-[12px]">
        <Row label="촬영 기기" value={metadata.device} />
        <Row label="촬영 일시" value={metadata.capturedAt} />
        <Row
          label="편집 프로그램"
          value={
            metadata.editor ??
            (metadata.status === 'clean' ? METADATA_COPY.noRecord : null)
          }
          tone={isEdited ? 'warning' : 'default'}
        />
      </dl>
      <p className="text-[12px] leading-[1.45] text-neutral-text-muted">
        {metadata.status === 'missing'
          ? METADATA_COPY.missingNote
          : METADATA_COPY.note}
      </p>
    </section>
  );
};

export default MetadataCard;
