import AdminLogo from '@pages/admin/components/AdminLogo';

/** 로그인 화면 왼쪽 브랜드 패널 (좁은 화면에서는 숨김) */
const LoginBrandPanel = () => {
  return (
    <div className="hidden w-[640px] shrink-0 py-[24px] pl-[24px] lg:flex">
      <div className="flex flex-1 flex-col gap-[20px] overflow-hidden rounded-[40px] bg-linear-[126deg] from-admin-panel-start via-admin-panel-mid via-40% to-admin-panel-end to-70% p-[64px]">
        <AdminLogo size="lg" />

        <div className="flex-1" />

        <div className="flex size-[165px] items-center justify-center">
          <div className="flex size-[150px] rotate-6 flex-col bg-brand-yellow-400 px-[22px] py-[30px] text-[22px] leading-[1.45] font-bold text-neutral-text drop-shadow-[0_12px_15px_rgba(31,51,41,0.1)]">
            <span>관리자</span>
            <span>전용</span>
          </div>
        </div>

        <p className="text-[34px] leading-[1.35] font-black text-neutral-text">
          서비스 이용 현황과
          <br />
          분석 결과를 관리해요
        </p>
        <p className="text-[16px] leading-[1.45] text-neutral-text-sub">
          관리자 계정으로만 접속할 수 있어요.
        </p>
      </div>
    </div>
  );
};

export default LoginBrandPanel;
