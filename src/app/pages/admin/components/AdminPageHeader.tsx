import type { ReactNode } from 'react';

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  /** 오른쪽 영역 (기간 선택 등) */
  actions?: ReactNode;
}

/** 관리자 화면 상단 — 제목·설명 + 오른쪽 액션 */
const AdminPageHeader = ({
  title,
  description,
  actions,
}: AdminPageHeaderProps) => {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-[16px]">
      <div className="flex flex-col gap-[4px] leading-[1.45]">
        <h1 className="text-[28px] font-black text-neutral-text">{title}</h1>
        {description && (
          <p className="text-[14px] text-neutral-text-sub">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-[10px]">{actions}</div>}
    </header>
  );
};

export default AdminPageHeader;
