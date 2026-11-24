/**
 * 관리자 계정 (프론트 고정값)
 * - 별도 인증 API 없이 입력값과 일치하는지만 확인합니다.
 * - 빌드 결과물에 그대로 포함되므로 실제 보안 수단이 아닌 화면 접근 분기용입니다.
 */
export const ADMIN_ACCOUNT = {
  id: 'tagit',
  password: '1234',
} as const;

/** 로그인 상태 (sessionStorage — 탭을 닫으면 로그아웃) */
export const ADMIN_AUTH_STORAGE_KEY = 'tagit-admin-auth';

/** '아이디 저장' 체크 시 저장하는 아이디 (localStorage) */
export const ADMIN_SAVED_ID_STORAGE_KEY = 'tagit-admin-saved-id';
