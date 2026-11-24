import { useContext } from 'react';
import { UserPhotoContext } from '@shared/contexts/UserPhotoContext';

export const useUserPhoto = () => {
  const context = useContext(UserPhotoContext);

  if (!context) {
    throw new Error(
      'useUserPhoto 는 UserPhotoProvider 안에서만 사용할 수 있어요.'
    );
  }

  return context;
};
