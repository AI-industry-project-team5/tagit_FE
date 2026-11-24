import { useCallback, useEffect, useRef, useState } from 'react';
import type { ToastState, ToastTone } from '@shared/components/ui/Toast';

const TOAST_DURATION_MS = 3000;

/** 토스트 상태 관리 — <Toast toast={toast} /> 와 함께 사용합니다. */
export const useToast = () => {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((tone: ToastTone, message: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToast({ id: Date.now(), tone, message });
    timerRef.current = setTimeout(() => setToast(null), TOAST_DURATION_MS);
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    []
  );

  return { toast, showToast };
};
