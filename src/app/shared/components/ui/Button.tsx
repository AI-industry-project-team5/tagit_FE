import type { ButtonHTMLAttributes } from 'react';

/**
 * Figma Button/Primary · Secondary · Disabled
 * - 'disabled' 는 모양만 비활성입니다. 사진 없이 누르면 안내 토스트를 띄워야 하는
 *   경우(U-05)가 있어 네이티브 disabled 가 아닌 aria-disabled 로 처리합니다.
 */
type ButtonVariant = 'primary' | 'secondary' | 'disabled';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    'cursor-pointer bg-brand-green-500 text-brand-green-100 shadow-button hover:-translate-y-px hover:brightness-95 active:translate-y-0 active:scale-[0.98]',
  secondary:
    'cursor-pointer bg-brand-green-100 text-brand-green-500 hover:-translate-y-px hover:brightness-95 active:translate-y-0 active:scale-[0.98]',
  disabled: 'bg-neutral-border text-neutral-text-muted cursor-default',
};

const Button = ({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      aria-disabled={variant === 'disabled' || undefined}
      className={`flex h-[56px] items-center justify-center rounded-[30px] px-[20px] text-[16px] leading-normal font-bold whitespace-nowrap transition duration-200 ease-out ${VARIANT_CLASS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
