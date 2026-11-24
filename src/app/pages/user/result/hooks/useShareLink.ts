import { useState } from 'react';
import type { ToastTone } from '@shared/components/ui/Toast';
import { MOCK_QUERY_KEY } from '@shared/mocks/mockScenarios';
import type { MockSetting } from '@shared/mocks/mockScenarios';
import { createShareLink } from '@shared/mocks/mockUserApi';
import type { Feature } from '@shared/types/feature';
import { getSharePath } from '@routes/path';

/** 공유 링크 문구 (R-16, R-17) */
const SHARE_SUCCESS = '링크를 복사했어요. 7일 동안 볼 수 있어요';
const SHARE_FAILURE = '링크를 만들지 못했어요. 다시 시도해주세요';

/**
 * 결과 링크 공유하기 (R-16, R-17)
 * 링크를 만들어 클립보드에 복사합니다. 현재는 Mock 이라 실제로 저장되는 링크가 아니며,
 * 화면 확인을 위해 같은 시나리오(?mock=)를 링크에 붙여 줍니다.
 */
export const useShareLink = (
  feature: Feature,
  setting: MockSetting,
  scenario: string,
  showToast: (tone: ToastTone, message: string) => void
) => {
  const [sharing, setSharing] = useState(false);

  const share = async () => {
    if (sharing) {
      return;
    }

    setSharing(true);
    try {
      const { token } = await createShareLink(feature, setting);
      const url = `${window.location.origin}${getSharePath(token)}?${MOCK_QUERY_KEY}=${scenario}`;
      await navigator.clipboard.writeText(url);
      showToast('success', SHARE_SUCCESS);
    } catch {
      showToast('error', SHARE_FAILURE);
    } finally {
      setSharing(false);
    }
  };

  return { share, sharing };
};
