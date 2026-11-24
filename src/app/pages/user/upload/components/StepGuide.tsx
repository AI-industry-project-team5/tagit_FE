import scanIcon from '@shared/assets/icons/step-scan.svg';
import noteIcon from '@shared/assets/icons/step-note.svg';
import shieldIcon from '@shared/assets/icons/step-shield.svg';
import type { FeatureStep, StepIconName } from '@shared/constants/featureCopy';

/** "이렇게 분석해요 / 이렇게 찾아요" 단계 안내 (H-02) */
interface StepGuideProps {
  heading: [string, string];
  steps: FeatureStep[];
}

const STEP_ICON: Record<StepIconName, string> = {
  scan: scanIcon,
  note: noteIcon,
  shield: shieldIcon,
};

const StepGuide = ({ heading, steps }: StepGuideProps) => {
  return (
    <section className="flex flex-col gap-[36px] px-[24px] pt-[96px] pb-[40px] md:px-[120px]">
      <h2 className="text-[36px] leading-[1.4] font-black text-neutral-text">
        <span className="text-brand-green-500">{heading[0]}</span>
        {heading[1]}
      </h2>
      <ol className="flex flex-col gap-[24px] md:flex-row">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex min-w-0 flex-1 flex-col gap-[14px] rounded-[32px] border border-neutral-border bg-white px-[32px] pt-[32px] pb-[36px] shadow-card transition-all duration-300 ease-out hover:-translate-y-[4px] hover:shadow-feature-selected"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-[72px] items-center justify-center rounded-[36px] bg-brand-green-100">
                <img
                  src={STEP_ICON[step.icon]}
                  alt=""
                  className="size-[34px]"
                />
              </span>
              <span
                aria-hidden="true"
                className="text-[28px] leading-[1.4] font-black text-brand-green-300"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="text-[21px] leading-[1.4] font-bold text-neutral-text">
              {step.title}
            </h3>
            <p className="text-[15px] leading-[1.4] text-neutral-text-sub">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default StepGuide;
