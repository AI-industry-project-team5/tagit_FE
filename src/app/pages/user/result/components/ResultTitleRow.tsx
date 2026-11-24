/** 결과 화면 제목 줄 (검증 결과 · 2026.11.20 14:32 분석) */
interface ResultTitleRowProps {
  title: string;
  meta: string;
}

const ResultTitleRow = ({ title, meta }: ResultTitleRowProps) => {
  return (
    <div className="flex flex-wrap items-center gap-x-[12px] gap-y-[4px] leading-[1.45]">
      <h1 className="text-[32px] font-black text-neutral-text">{title}</h1>
      <p className="text-[14px] text-neutral-text-sub">{meta}</p>
    </div>
  );
};

export default ResultTitleRow;
