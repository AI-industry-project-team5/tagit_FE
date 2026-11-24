import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@shared/hooks/useToast';
import { useUserPhoto } from '@shared/hooks/useUserPhoto';
import { UPLOAD_TOAST } from '@shared/constants/featureCopy';
import { MOCK_QUERY_KEY, withMockQuery } from '@shared/mocks/mockScenarios';
import { requestAnalysis } from '@shared/mocks/mockUserApi';
import { getAnalyzingPath } from '@routes/path';
import { canDecodeImage, validateImageFile } from '@shared/utils/imageFile';
import type { ImageFileError } from '@shared/utils/imageFile';

/**
 * 메인 화면의 업로드 흐름 (U-02 ~ U-10)
 * - 파일 검증(형식·용량·손상) 후 사진을 Context 에 보관
 * - 분석 요청은 Mock API 를 호출하고 분석 중 화면으로 이동
 */
export const useUploadFlow = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { feature, setFeature, photo, setPhotoFile, clearPhoto } =
    useUserPhoto();
  const { toast, showToast } = useToast();
  const [error, setError] = useState<ImageFileError | null>(null);
  const [starting, setStarting] = useState(false);

  const mockRaw = searchParams.get(MOCK_QUERY_KEY);

  /** 여러 장이면 첫 번째 사진만 사용 (U-08) */
  const handleFiles = async (files: File[]) => {
    const [first] = files;

    const fileError = validateImageFile(first);
    if (fileError) {
      clearPhoto();
      setError(fileError);
      return;
    }

    if (!(await canDecodeImage(first))) {
      clearPhoto();
      setError('corrupt');
      return;
    }

    setError(null);
    setPhotoFile(first);

    if (files.length > 1) {
      showToast('error', UPLOAD_TOAST.multiple);
    }
  };

  /** 분석(검색) 시작 (U-05, U-10) */
  const handleStart = async () => {
    if (!photo || error) {
      showToast('error', UPLOAD_TOAST.noPhoto);
      return;
    }
    if (starting) {
      return;
    }

    setStarting(true);
    try {
      const { analysisId } = await requestAnalysis(feature);
      navigate(withMockQuery(getAnalyzingPath(feature, analysisId), mockRaw));
    } finally {
      setStarting(false);
    }
  };

  return {
    feature,
    setFeature,
    photo,
    error,
    toast,
    handleFiles,
    handleStart,
  };
};
