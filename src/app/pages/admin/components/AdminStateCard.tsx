import Button from '@shared/components/ui/Button';
import alertIcon from '@shared/assets/icons/alert-circle-md.svg';

interface AdminStateCardProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * 관리자 화면 오류 상태 카드 (AD-g 데이터를 불러오지 못했어요)
 * 아이콘 · 제목 · 설명 · 버튼(선택)
 */
const AdminStateCard = ({
  title,
  description,
  actionLabel,
  onAction,
}: AdminStateCardProps) => {
  return (
    <section
      role="alert"
      className="flex w-full animate-fade-in flex-col items-center gap-[12px] rounded-[24px] bg-white px-[24px] py-[72px] text-center"
    >
      <span className="flex size-[80px] items-center justify-center rounded-[40px] bg-verdict-danger-bg">
        <img src={alertIcon} alt="" width={36} height={36} />
      </span>
      <h2 className="text-[20px] leading-[1.45] font-bold text-neutral-text">
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
