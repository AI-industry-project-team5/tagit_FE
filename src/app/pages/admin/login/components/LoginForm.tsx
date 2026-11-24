import { useState } from 'react';
import Button from '@shared/components/ui/Button';
import eyeIcon from '@shared/assets/icons/eye.svg';
import LoginField from '@pages/admin/login/components/LoginField';
import { useAdminLoginForm } from '@pages/admin/login/hooks/useAdminLoginForm';

interface LoginFormProps {
  onSuccess: () => void;
}

const ERROR_MESSAGE = '아이디 또는 비밀번호가 맞지 않아요';

/** 관리자 로그인 폼 (A-00 · AD-a 로그인 실패 · AD-e 빈 칸) */
const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const form = useAdminLoginForm(onSuccess);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      noValidate
      onSubmit={form.submit}
      className="flex w-full max-w-[400px] flex-col gap-[20px]"
    >
      <div className="flex flex-col gap-[6px] leading-[1.45]">
        <h1 className="text-[30px] font-black text-neutral-text">
          관리자 로그인
        </h1>
        <p className="text-[15px] text-neutral-text-sub">
          관리자 아이디와 비밀번호를 입력해주세요
        </p>
      </div>

      <LoginField
        id="admin-id"
        label="아이디"
        type="text"
        autoComplete="username"
        placeholder="아이디를 입력해주세요"
        value={form.id}
        onChange={(event) => form.changeId(event.target.value)}
      />

      <LoginField
        id="admin-password"
        label="비밀번호"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        placeholder="비밀번호를 입력해주세요"
        value={form.password}
        invalid={form.hasError}
        errorMessage={form.hasError ? ERROR_MESSAGE : undefined}
        onChange={(event) => form.changePassword(event.target.value)}
        trailing={
          <button
            type="button"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((prev) => !prev)}
            className={`flex shrink-0 items-center justify-center rounded-[6px] transition-opacity duration-200 hover:opacity-100 ${showPassword ? 'opacity-100' : 'opacity-60'}`}
          >
            <img src={eyeIcon} alt="" width={20} height={20} />
          </button>
        }
      />

      <label
        htmlFor="admin-remember-id"
        className="flex items-center gap-[8px] self-start text-[14px] leading-[1.45] text-neutral-text-sub"
      >
        <input
          id="admin-remember-id"
          type="checkbox"
          checked={form.rememberId}
          onChange={(event) => form.setRememberId(event.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="flex size-[18px] items-center justify-center rounded-[5px] border-[1.5px] border-neutral-border text-transparent transition-colors duration-200 peer-checked:border-brand-green-500 peer-checked:bg-brand-green-500 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-green-500"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.2 4.9 8.5 9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        아이디 저장
      </label>

      <Button
        type="submit"
        variant={form.canSubmit ? 'primary' : 'disabled'}
        className="w-full"
      >
        로그인
      </Button>

      <p className="text-center text-[13px] leading-[1.45] text-neutral-text-muted">
        관리자 계정은 팀에서 공유한 정보로 로그인해주세요
      </p>
    </form>
  );
};

export default LoginForm;
