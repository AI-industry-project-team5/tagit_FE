import ellipse from '@shared/assets/hero/ellipse.svg';
import magnifier from '@shared/assets/hero/magnifier.svg';

/** 메인 히어로 일러스트 (Figma Illustration 420×320) */
const HeroIllustration = () => {
  return (
    <div
      aria-hidden="true"
      className="relative hidden h-[320px] w-[420px] shrink-0 lg:block"
    >
      <img
        src={ellipse}
        alt=""
        className="absolute top-[10px] left-[80px] size-[300px]"
      />
      <div className="absolute top-[42.23px] left-[70px] flex h-[226.619px] w-[191.02px] items-center justify-center">
        <div className="h-[210px] w-[170px] -rotate-6 rounded-[24px] bg-placeholder-illustration" />
      </div>
      <div className="absolute top-[110px] left-[177.73px] flex size-[180.711px] items-center justify-center">
        <div className="relative size-[160px] rotate-8 bg-brand-yellow-400 shadow-card">
          <p className="absolute top-[44px] left-[22px] text-[24px] leading-[1.4] font-bold whitespace-nowrap text-neutral-text">
            중고왕123
            <br />
            11.10
          </p>
        </div>
      </div>
      <img
        src={magnifier}
        alt=""
        className="absolute top-[40px] left-[290px] size-[120px]"
      />
      <div className="absolute top-[250px] left-[10px] rounded-[30px] bg-white px-[14px] py-[8px] shadow-card">
        <p className="text-[14px] leading-[1.4] font-bold whitespace-nowrap text-brand-green-500">
          AI 합성 의심 12%
        </p>
      </div>
    </div>
  );
};

export default HeroIllustration;
