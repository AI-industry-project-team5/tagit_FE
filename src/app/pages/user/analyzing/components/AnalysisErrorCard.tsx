import Button from '@shared/components/ui/Button';
import alertIcon from '@shared/assets/icons/alert-circle-lg.svg';

/** A-b 분석 오류 (A-04) — 서버·AI 호출 실패 */
interface AnalysisErrorCardProps {
  onRetry: () => void;
  onHome: () => void;
}

const AnalysisErrorCard = ({ onRetry, onHome }: AnalysisErrorCardProps) => {
  return (
    <section
      role="alert"
      className="flex w-full max-w-[600px] flex-col items-center gap-[28px] rounded-[28px] px-[24px] pt-[48px] pb-[40px] md:px-[48px]"
      style={{
        backgroundImage:
          'linear-gradient(132.67deg, #e3f7ed 0%, #f5fcf9 39.286%, #fff7db 71.429%)',
      }}
    >
      <span className="flex size-[104px] items-center justify-center rounded-[52px] bg-verdict-danger-bg">
        <img src={alertIcon} alt="" className="size-[48px]" />
      </span>
      <div className="flex flex-col items-center gap-[6px] text-center leading-[1.45]">
        <h1 className="text-[26px] font-bold text-neutral-text">
          분석 중 문제가 생겼어요
        </h1>
        <p className="text-[15px] text-neutral-text-sub">
          잠시 후 다시 시도해주세요.
        </p>
      </div>
      <div className="flex w-full flex-col gap-[12px] sm:flex-row">
        <Button onClick={onRetry} className="flex-1">
          다시 시도
        </Button>
        <Button variant="secondary" onClick={onHome} className="flex-1">
          처음으로
        </Button>
      </div>
    </section>
  );
};

export default AnalysisErrorCard;
