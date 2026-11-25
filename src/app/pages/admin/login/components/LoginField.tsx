import type { InputHTMLAttributes, ReactNode } from 'react';

interface LoginFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  invalid?: boolean;
  /** 입력창 오른쪽 영역 (비밀번호 보기 버튼 등) */
  trailing?: ReactNode;
  /** 입력창 아래 에러 문구 */
  errorMessage?: string;
}

/**
 * 로그인 입력 필드
 * - 기본: 1px 회색 테두리 / 포커스: 2px 초록 / 에러: 2px 빨강 (A-00, AD-a)
 * - 2px 테두리는 inset 그림자로 겹쳐 그려 포커스 시 레이아웃이 밀리지 않게 합니다.
 */
const LoginField = ({
  id,
  label,
  invalid = false,
  trailing,
  errorMessage,
  ...inputProps
}: LoginFieldProps) => {
  const errorId = `${id}-error`;
  const stateClass = invalid
    ? 'border-verdict-danger shadow-[inset_0_0_0_1px_var(--color-verdict-danger)]'
    : 'border-neutral-border focus-within:border-brand-green-500 focus-within:shadow-[inset_0_0_0_1px_var(--color-brand-green-500)]';

  return (
    <div className="flex w-full flex-col gap-[8px]">
      <label
        htmlFor={id}
        className="text-[14px] leading-[1.45] font-bold text-neutral-text"
      >
        {label}
      </label>
      <div
        className={`flex h-[56px] w-full items-center gap-[8px] rounded-[14px] border bg-white pr-[16px] pl-[18px] transition-[border-color,box-shadow] duration-200 ${stateClass}`}
      >
        <input
          id={id}
          aria-invalid={invalid || undefined}
          aria-describedby={errorMessage ? errorId : undefined}
          className="min-w-0 flex-1 bg-transparent text-[16px] leading-[1.45] font-medium text-neutral-text outline-none placeholder:font-normal placeholder:text-neutral-text-muted focus-visible:outline-none"
          {...inputProps}
        />
        {trailing}
      </div>
      {errorMessage && (
        <p
          id={errorId}
          role="alert"
          className="text-[13px] leading-[1.45] font-medium text-verdict-danger"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default LoginField;
