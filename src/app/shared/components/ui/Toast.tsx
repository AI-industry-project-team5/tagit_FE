import successIcon from '@shared/assets/icons/toast-success.svg';
import errorIcon from '@shared/assets/icons/toast-error.svg';

/** Figma Toast/Success · Toast/Error */
export type ToastTone = 'success' | 'error';

export interface ToastState {
  id: number;
  tone: ToastTone;
  message: string;
}

interface ToastProps {
  toast: ToastState | null;
}

const Toast = ({ toast }: ToastProps) => {
  if (!toast) {
    return null;
  }

  return (
    <div
      key={toast.id}
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed bottom-[48px] left-1/2 z-50 animate-fade-in flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-[10px] rounded-[30px] bg-neutral-toast py-[14px] pr-[24px] pl-[20px] shadow-toast"
    >
      <img
        src={toast.tone === 'success' ? successIcon : errorIcon}
        alt=""
        className="size-[20px] shrink-0"
      />
      <p className="text-[15px] leading-normal font-medium text-white">
        {toast.message}
      </p>
    </div>
  );
};

export default Toast;
