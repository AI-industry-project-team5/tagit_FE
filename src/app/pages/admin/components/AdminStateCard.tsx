import Button from '@shared/components/ui/Button';
import alertIcon from '@shared/assets/icons/alert-circle-md.svg';
import imageIcon from '@shared/assets/icons/image.svg';

type AdminStateVariant = 'error' | 'empty';

interface AdminStateCardProps {
  /** error: 불러오기 실패 (AD-g), empty: 결과 없음 (AD-d, AD-h) */
  variant?: AdminStateVariant;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const VARIANT_STYLE: Record<
  AdminStateVariant,
  { icon: string; iconClass: string; cardClass: string }
> = {
  error: {
    icon: alertIcon,
    iconClass: 'bg-verdict-danger-bg',
    cardClass: 'py-[72px]',
  },
  empty: {
    icon: imageIcon,
    iconClass: 'bg-neutral-bg',
    cardClass: 'py-[80px]',
  },
};

/**
 * 관리자 화면 상태 카드
 * 아이콘 · 제목 · 설명 · 버튼(선택)
 */
const AdminStateCard = ({
  variant = 'error',
  title,
  description,
  actionLabel,
  onAction,
}: AdminStateCardProps) => {
  const style = VARIANT_STYLE[variant];

  return (
    <section
      role={variant === 'error' ? 'alert' : 'status'}
      className={`flex w-full animate-fade-in flex-col items-center gap-[12px] rounded-[24px] bg-white px-[24px] text-center ${style.cardClass}`}
    >
      <span
        className={`flex size-[80px] items-center justify-center rounded-[40px] ${style.iconClass}`}
      >
        <img src={style.icon} alt="" width={36} height={36} />
      </span>
      <h2 className="text-[20px] leading-[1.45] font-bold break-all text-neutral-text">
        {title}
      </h2>
      <p className="text-[14px] leading-[1.45] text-neutral-text-sub">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="w-[240px] max-w-full">
          {actionLabel}
        </Button>
      )}
    </section>
  );
};

export default AdminStateCard;
