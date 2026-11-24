import shieldIcon from '@shared/assets/icons/shield-check.svg';
import copyIcon from '@shared/assets/icons/copy.svg';
import selectedIcon from '@shared/assets/icons/radio-selected.svg';
import unselectedIcon from '@shared/assets/icons/radio-unselected.svg';
import { FEATURE_COPY } from '@shared/constants/featureCopy';
import { FEATURES } from '@shared/types/feature';
import type { Feature } from '@shared/types/feature';

/** H-01 · H-02 · 기능 선택 카드 (선택: 초록 테두리 + 체크 / 미선택: 회색 테두리 + 빈 원) */
interface FeatureSelectorProps {
  value: Feature;
  onChange: (feature: Feature) => void;
}

const FEATURE_ICON: Record<Feature, string> = {
  ai: shieldIcon,
  similar: copyIcon,
};

const FeatureSelector = ({ value, onChange }: FeatureSelectorProps) => {
  return (
    <div
      role="radiogroup"
      aria-label="확인할 기능 선택"
      className="flex w-full flex-col gap-[16px] md:flex-row"
    >
      {FEATURES.map((feature) => {
        const selected = feature === value;
        const copy = FEATURE_COPY[feature];

        return (
          <button
            key={feature}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(feature)}
            className={`flex min-w-0 flex-1 items-center gap-[16px] cursor-pointer rounded-[24px] bg-white px-[22px] py-[20px] text-left transition-all duration-300 ease-out hover:-translate-y-[2px] active:scale-[0.99] ${
              selected
                ? 'border-2 border-brand-green-500 shadow-feature-selected'
                : 'border-[1.5px] border-neutral-border-strong shadow-feature hover:border-brand-green-300'
            }`}
          >
            <span className="flex size-[56px] shrink-0 items-center justify-center rounded-[28px] bg-brand-green-100">
              <img src={FEATURE_ICON[feature]} alt="" className="size-[26px]" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-[2px] leading-[1.4]">
              <span className="text-[19px] font-bold text-neutral-text">
                {copy.cardTitle}
              </span>
              <span className="text-[14px] text-neutral-text-sub">
                {copy.cardDescription}
              </span>
            </span>
            <img
              src={selected ? selectedIcon : unselectedIcon}
              alt=""
              className="size-[26px] shrink-0"
            />
          </button>
        );
      })}
    </div>
  );
};

export default FeatureSelector;
