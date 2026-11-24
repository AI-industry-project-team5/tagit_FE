import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  getSavedAdminId,
  setAdminLoggedIn,
  setSavedAdminId,
  verifyAdminAccount,
} from '@pages/admin/utils/adminAuth';

/**
 * 관리자 로그인 폼 상태
 * - 아이디·비밀번호 중 하나라도 비어 있으면 제출 불가 (AD-e)
 * - 불일치 시 에러 표시, 입력을 고치면 에러를 지웁니다 (AD-a)
 * - "아이디 저장" 체크 시 다음 방문에도 아이디를 채워 둡니다
 */
export const useAdminLoginForm = (onSuccess: () => void) => {
  const [id, setId] = useState(getSavedAdminId);
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(() => getSavedAdminId() !== '');
  const [hasError, setHasError] = useState(false);

  const canSubmit = id.trim() !== '' && password !== '';

  const changeId = (value: string) => {
    setId(value);
    setHasError(false);
  };

  const changePassword = (value: string) => {
    setPassword(value);
    setHasError(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    if (!verifyAdminAccount(id, password)) {
      setHasError(true);
      return;
    }

    setSavedAdminId(rememberId ? id.trim() : null);
    setAdminLoggedIn(true);
    onSuccess();
  };

  return {
    id,
    password,
    rememberId,
    hasError,
    canSubmit,
    changeId,
    changePassword,
    setRememberId,
    submit,
  };
};
