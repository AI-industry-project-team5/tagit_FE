import { createContext } from 'react';
import type { Feature } from '@shared/types/feature';

/** 사용자가 올린 사진 (기능 전환·결과 간 이동에서 유지) */
export interface UserPhoto {
  file: File;
  /** 미리보기용 object URL */
  previewUrl: string;
  name: string;
  size: number;
}

export interface UserPhotoContextValue {
  /** 메인에서 선택한 기능 */
  feature: Feature;
  setFeature: (feature: Feature) => void;
  photo: UserPhoto | null;
  setPhotoFile: (file: File) => void;
  clearPhoto: () => void;
}

export const UserPhotoContext = createContext<UserPhotoContextValue | null>(
  null
);
