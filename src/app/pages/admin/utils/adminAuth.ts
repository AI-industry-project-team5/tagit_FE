import {
  ADMIN_ACCOUNT,
  ADMIN_AUTH_STORAGE_KEY,
  ADMIN_SAVED_ID_STORAGE_KEY,
} from '@pages/admin/constants/adminAuth';

type StorageType = 'sessionStorage' | 'localStorage';

/**
 * 관리자 로그인 상태 저장소
 * 시크릿 모드·저장소 차단 환경에서는 storage 접근 자체가 실패할 수 있어 모두 try/catch 로 감쌉니다.
 */
const readStorage = (type: StorageType, key: string) => {
  try {
    return window[type].getItem(key);
  } catch {
    return null;
  }
};

const writeStorage = (type: StorageType, key: string, value: string | null) => {
  try {
    if (value === null) window[type].removeItem(key);
    else window[type].setItem(key, value);
  } catch {
    // 저장에 실패해도 화면 동작에는 영향 없음
  }
};

/** 입력한 아이디·비밀번호가 관리자 계정과 일치하는지 확인 */
export const verifyAdminAccount = (id: string, password: string) =>
  id.trim() === ADMIN_ACCOUNT.id && password === ADMIN_ACCOUNT.password;

/** storage 를 쓸 수 없는 환경에서도 현재 탭에서는 로그인이 유지되도록 하는 메모리 값 */
let loggedInFallback = false;

export const isAdminLoggedIn = () =>
  loggedInFallback ||
  readStorage('sessionStorage', ADMIN_AUTH_STORAGE_KEY) === 'true';

export const setAdminLoggedIn = (loggedIn: boolean) => {
  loggedInFallback = loggedIn;
  writeStorage(
    'sessionStorage',
    ADMIN_AUTH_STORAGE_KEY,
    loggedIn ? 'true' : null
  );
};

export const getSavedAdminId = () =>
  readStorage('localStorage', ADMIN_SAVED_ID_STORAGE_KEY) ?? '';

export const setSavedAdminId = (id: string | null) =>
  writeStorage('localStorage', ADMIN_SAVED_ID_STORAGE_KEY, id);
