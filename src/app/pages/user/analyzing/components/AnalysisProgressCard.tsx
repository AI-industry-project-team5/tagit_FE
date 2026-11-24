import Button from '@shared/components/ui/Button';
import doneIcon from '@shared/assets/icons/progress-done.svg';
import doingIcon from '@shared/assets/icons/progress-doing.svg';
import waitIcon from '@shared/assets/icons/progress-wait.svg';
import { FEATURE_COPY } from '@shared/constants/featureCopy';
import { MOCK_PHOTO_URL } from '@shared/mocks/userMockData';
import type { Feature } from '@shared/types/feature';

/**
 * 3-A 분석 중 · 3-B 찾는 중 · A-a 응답 지연
 * 기능 1·2가 같은 카드를 쓰고 문구·단계 이름만 다릅니다.
 */
interface AnalysisProgressCardProps {
  feature: Feature;
  /** 0~2 진행 중인 단계, 3 은 모두 완료 */
  stage: number;
  /** 업로드한 사진 미리보기 (없으면 샘플 이미지) */
  photoUrl: string | null;
  /** 응답 지연 안내 표시 (A-03) */
  slow: boolean;
  onRetry: () => void;
}

const STAGE_COUNT = 3;

const getPercent = (stage: number) =>
  stage >= STAGE_COUNT ? 100 : ((stage + 0.65) / STAGE_COUNT) * 100;

type StepStatus = 'done' | 'doing' | 'wait';

const STATUS_LABEL: Record<StepStatus, string> = {
  done: '완료',
  doing: '진행 중',
  wait: '대기',
};

const STATUS_ICON: Record<StepStatus, string> = {
  done: doneIcon,
  doing: doingIcon,
  wait: waitIcon,
};

const getStatus = (index: number, stage: number): StepStatus =>
  index < stage ? 'done' : index === stage ? 'doing' : 'wait';

const AnalysisProgressCard = ({
  feature,
  stage,
  photoUrl,
  slow,
  onRetry,
}: AnalysisProgressCardProps) => {
  const copy = FEATURE_COPY[feature].progress;
  const percent = getPercent(stage);

  return (
    <section
      className="flex w-full max-w-[600px] flex-col items-center gap-[28px] rounded-[28px] px-[24px] pt-[48px] pb-[40px] md:px-[48px]"
      style={{
        backgroundImage:
          'linear-gradient(132.67deg, #e3f7ed 0%, #f5fcf9 39.286%, #fff7db 71.429%)',
      }}
    >
      <div
        aria-hidden="true"
        className="relative size-[240px] overflow-hidden rounded-[20px] bg-placeholder-photo-bg"
      >
        <img
          src={photoUrl ?? MOCK_PHOTO_URL}
          alt=""
          className="size-full object-cover"
        />
        <div className="absolute top-[47%] left-[53.75%] size-[38.3%] rounded-[6px] border-[2.5px] border-dashed border-brand-green-500" />
        <div className="absolute left-0 h-[3px] w-full animate-scan bg-brand-green-500" />
      </div>

      <div className="flex flex-col items-center gap-[6px] text-center leading-[1.45]">
        <h1 className="text-[26px] font-bold text-neutral-text">
          {slow ? '분석이 평소보다 오래 걸리고 있어요' : copy.title}
        </h1>
        <p className="text-[15px] text-neutral-text-sub">
          {slow
            ? '조금만 더 기다려주세요. 계속 멈춰 있다면 다시 시도해주세요.'
            : copy.subtitle}
        </p>
      </div>

      <div
        role="progressbar"
        aria-label="진행률"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
        className="h-[8px] w-full overflow-hidden rounded-[4px] bg-neutral-border"
      >
        <div
          className="h-full rounded-[4px] bg-brand-green-500 transition-[width] duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ol className="w-full rounded-[14px] bg-white px-[20px] py-[6px]">
        {copy.steps.map((label, index) => {
          const status = getStatus(index, stage);

          return (
            <li key={label} className="flex items-center gap-[12px] py-[14px]">
              <img
                src={STATUS_ICON[status]}
                alt=""
                className={`size-[22px] shrink-0 ${status === 'doing' ? 'animate-spin' : ''}`}
              />
              <span
                className={`flex-1 text-[16px] leading-[1.45] ${
                  status === 'wait'
                    ? 'font-normal text-neutral-text-muted'
                    : 'font-medium text-neutral-text'
                }`}
              >
                {label}
              </span>
              <span
                className={`text-[14px] leading-[1.45] font-medium ${
                  status === 'done'
                    ? 'text-verdict-safe'
                    : status === 'doing'
                      ? 'text-brand-green-500'
                      : 'text-neutral-text-muted'
                }`}
              >
                {STATUS_LABEL[status]}
              </span>
            </li>
          );
        })}
      </ol>

      {slow && (
        <Button variant="secondary" onClick={onRetry} className="w-full">
          다시 시도
        </Button>
      )}
    </section>
  );
};

export default AnalysisProgressCard;
