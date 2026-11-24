import Button from '@shared/components/ui/Button';
import clockIcon from '@shared/assets/icons/clock.svg';
import searchXIcon from '@shared/assets/icons/search-x.svg';

/** S-a 만료된 링크 (S-03) · S-b 없는 링크 (S-04) */
interface ShareMessageCardProps {
  kind: 'expired' | 'not-found';
  onStart: () => void;
}

const MESSAGE = {
  expired: {
    icon: clockIcon,
    title: '공유 기간이 끝난 결과예요',
    lines: [
      '공유된 분석 결과는 7일 동안만 볼 수 있어요.',
      '받은 인증샷이 있다면 직접 분석해보세요.',
    ],
  },
  'not-found': {
    icon: searchXIcon,
    title: '결과를 찾을 수 없어요',
    lines: ['링크 주소가 정확한지 다시 확인해주세요.'],
  },
} as const;

const ShareMessageCard = ({ kind, onStart }: ShareMessageCardProps) => {
  const message = MESSAGE[kind];

  return (
    <section className="flex w-full max-w-[600px] flex-col items-center gap-[28px] rounded-[28px] bg-brand-green-100 px-[24px] pt-[48px] pb-[40px] shadow-message md:px-[48px]">
      <span className="flex size-[104px] items-center justify-center rounded-[52px] bg-verdict-hold-bg">
        <img src={message.icon} alt="" className="size-[48px]" />
      </span>
      <div className="flex flex-col items-center gap-[6px] text-center leading-[1.45]">
        <h1 className="text-[26px] font-bold text-neutral-text">
          {message.title}
        </h1>
        <p className="text-[15px] text-neutral-text-sub">
          {message.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
      <Button onClick={onStart} className="w-full">
        나도 인증샷 분석하기
      </Button>
    </section>
  );
};

export default ShareMessageCard;
