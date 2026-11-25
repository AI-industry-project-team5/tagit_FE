interface AdminLogoProps {
  size?: 'sm' | 'lg';
}

const SIZE_CLASS = {
  sm: { logo: 'text-[22px]', chip: 'text-[11px]' },
  lg: { logo: 'text-[26px]', chip: 'text-[12px]' },
} as const;

/** TAG:IT 로고 + 관리자 칩 (사이드바: sm, 로그인 브랜드 패널: lg) */
const AdminLogo = ({ size = 'sm' }: AdminLogoProps) => {
  return (
    <span className="flex items-center gap-[8px]">
      <span
        className={`leading-[1.45] font-black text-brand-green-500 ${SIZE_CLASS[size].logo}`}
      >
        TAG:IT
      </span>
      <span
        className={`rounded-[8px] bg-neutral-toast px-[8px] py-[2px] leading-[1.45] font-bold text-white ${SIZE_CLASS[size].chip}`}
      >
        관리자
      </span>
    </span>
  );
};

export default AdminLogo;
