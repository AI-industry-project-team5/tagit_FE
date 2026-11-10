/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 백엔드 API 서버 주소 */
  readonly VITE_API_BASE_URL: string;
  /** React Query Devtools 표시 여부 ('true'일 때만, 개발 모드 한정) */
  readonly VITE_ENABLE_QUERY_DEVTOOLS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
