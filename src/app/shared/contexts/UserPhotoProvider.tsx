import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Feature } from '@shared/types/feature';
import { UserPhotoContext } from '@shared/contexts/UserPhotoContext';
import type {
  UserPhoto,
  UserPhotoContextValue,
} from '@shared/contexts/UserPhotoContext';

interface UserPhotoProviderProps {
  children: ReactNode;
}

/**
 * 사용자 영역(/user/*) 전체에서 선택한 기능과 업로드한 사진을 유지합니다.
 * 새로고침하면 초기화됩니다. (실제 연동 시에는 서버에 저장된 사진을 사용)
 */
const UserPhotoProvider = ({ children }: UserPhotoProviderProps) => {
  const [feature, setFeature] = useState<Feature>('ai');
  const [photo, setPhoto] = useState<UserPhoto | null>(null);
  const urlRef = useRef<string | null>(null);

  const revokeUrl = useCallback(() => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
  }, []);

  const setPhotoFile = useCallback(
    (file: File) => {
      revokeUrl();
      const previewUrl = URL.createObjectURL(file);
      urlRef.current = previewUrl;
      setPhoto({ file, previewUrl, name: file.name, size: file.size });
    },
    [revokeUrl]
  );

  const clearPhoto = useCallback(() => {
    revokeUrl();
    setPhoto(null);
  }, [revokeUrl]);

  useEffect(() => revokeUrl, [revokeUrl]);

  const value = useMemo<UserPhotoContextValue>(
    () => ({ feature, setFeature, photo, setPhotoFile, clearPhoto }),
    [feature, photo, setPhotoFile, clearPhoto]
  );

  return (
    <UserPhotoContext.Provider value={value}>
      {children}
    </UserPhotoContext.Provider>
  );
};

export default UserPhotoProvider;
