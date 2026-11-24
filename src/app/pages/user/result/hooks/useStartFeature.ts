import { useNavigate } from 'react-router-dom';
import { useUserPhoto } from '@shared/hooks/useUserPhoto';
import { requestAnalysis } from '@shared/mocks/mockUserApi';
import type { Feature } from '@shared/types/feature';
import { getAnalyzingPath, paths } from '@routes/path';

/**
 * 결과 화면에서 같은 사진으로 기능을 실행하거나(R-19, M-08, 다시 찾기),
 * 업로드를 초기화하고 메인으로 돌아갑니다(R-18).
 */
export const useStartFeature = () => {
  const navigate = useNavigate();
  const { setFeature, clearPhoto } = useUserPhoto();

  /** 같은 사진으로 기능 실행 → 분석 중(3-A) 또는 찾는 중(3-B) 화면 */
  const startFeature = async (feature: Feature) => {
    setFeature(feature);
    const { analysisId } = await requestAnalysis(feature);
    navigate(getAnalyzingPath(feature, analysisId));
  };

  /** 업로드 초기화 후 메인(1-A / 1-B)으로 이동 */
  const restartWith = (feature: Feature) => {
    clearPhoto();
    setFeature(feature);
    navigate(paths.upload);
  };

  return { startFeature, restartWith };
};
