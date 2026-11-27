import { MODEL_RESULT_ITEMS } from '@pages/admin/detail/constants/detailCopy';
import type { DetailView } from '@pages/admin/detail/types/detailView';
import { formatRatio } from '@pages/admin/utils/format';
import type { Verdict } from '@shared/types/analysis';

interface ModelResultCardProps {
  models: DetailView['models'];
  /** AI 합성 확률 색은 전체 판정 색을 따릅니다. */
  verdict: Verdict;
}

const AI_VALUE_COLOR: Record<Verdict, string> = {
  danger: 'text-verdict-danger',
  suspicious: 'text-verdict-suspicious',
  safe: 'text-verdict-safe',
  hold: 'text-neutral-text',
};

/** 모델 결과 — 메모 영역 탐지 · AI 합성(Custom Vision) · AI 합성(PyTorch) */
const ModelResultCard = ({ models, verdict }: ModelResultCardProps) => {
  return (
    <section className="flex w-full flex-col gap-[12px] rounded-[24px] bg-white px-[24px] py-[22px] shadow-admin-card">
      <h2 className="text-[16px] leading-[1.4] font-bold text-neutral-text">
        모델 결과
      </h2>
      <dl className="grid grid-cols-1 gap-[8px] leading-[1.3] sm:grid-cols-3">
        {MODEL_RESULT_ITEMS.map(({ key, label, model }) => {
          const value = models[key];
          const valueColor =
            value === null
              ? 'text-neutral-text-muted'
              : key === 'detection'
                ? 'text-neutral-text'
                : AI_VALUE_COLOR[verdict];

          return (
            <div
              key={key}
              className="flex min-w-0 flex-col gap-[2px] rounded-[14px] bg-neutral-bg px-[14px] py-[12px]"
            >
              <dt className="text-[13px] font-bold text-neutral-text-sub">
                {label}
              </dt>
              <dd className={`text-[26px] font-black ${valueColor}`}>
                {value === null ? '—' : formatRatio(value)}
              </dd>
              <dd className="text-[11px] font-medium text-neutral-text-muted">
                {model}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
};

export default ModelResultCard;
