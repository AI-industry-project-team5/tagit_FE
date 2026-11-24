import { GUIDE_BANNER_COPY } from '@shared/constants/featureCopy';

/** 혹시, 아직 인증샷을 못 받으셨나요? 안내 배너 */
const GuideBanner = () => {
  return (
    <section className="px-[24px] pt-[56px] pb-[96px] md:px-[120px]">
      <div className="flex flex-col gap-[24px] rounded-[48px] bg-brand-yellow-100 px-[32px] py-[44px] md:flex-row md:items-center md:gap-[40px] md:px-[56px]">
        <div className="flex flex-1 flex-col gap-[10px] leading-[1.4]">
          <h2 className="text-[28px] font-black text-neutral-text">
            {GUIDE_BANNER_COPY.title}
          </h2>
          <p className="text-[16px] text-neutral-text-sub">
            {GUIDE_BANNER_COPY.description}
          </p>
        </div>
        <ul className="flex flex-wrap gap-[10px]">
          {GUIDE_BANNER_COPY.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-[30px] bg-white px-[18px] py-[12px] text-[15px] leading-[1.4] font-bold whitespace-nowrap text-neutral-text"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GuideBanner;
