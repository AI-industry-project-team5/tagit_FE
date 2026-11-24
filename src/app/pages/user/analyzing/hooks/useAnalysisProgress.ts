import { useEffect, useRef, useState } from 'react';
import type { MockFlow } from '@shared/mocks/mockScenarios';

/** A-03 응답 지연 기준 (실제 서비스 기준 30초) */
export const SLOW_AFTER_MS = 30_000;
/** Mock 에서 지연/오류 화면을 빠르게 확인하기 위한 값 */
const MOCK_SLOW_AFTER_MS = 2_500;
const STAGE_MS = 1_500;
const STAGE_COUNT = 3;

interface UseAnalysisProgressOptions {
  /** Mock 흐름: normal 은 끝까지 진행, slow 는 중간에 멈춤, error 는 오류 발생 */
  flow: MockFlow;
  /** 모든 단계가 끝났을 때 호출 (결과 화면으로 이동) */
  onComplete: () => void;
}

/**
 * 분석 진행 상태 시뮬레이션 (A-01 ~ A-05)
 * 실제 연동 시에는 서버의 진행 상태 응답으로 stage 를 갱신하면 됩니다.
 * - stage: 0~2 진행 중인 단계, 3 은 모두 완료
 * - slow: 오래 걸리는 중 (A-03)
 * - failed: 분석 오류 (A-04)
 */
export const useAnalysisProgress = ({
  flow,
  onComplete,
}: UseAnalysisProgressOptions) => {
  const [stage, setStage] = useState(0);
  const [slow, setSlow] = useState(false);
  const [failed, setFailed] = useState(false);
  const completeRef = useRef(onComplete);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const after = (ms: number, task: () => void) => {
      timers.push(setTimeout(task, ms));
    };

    after(flow === 'slow' ? MOCK_SLOW_AFTER_MS : SLOW_AFTER_MS, () =>
      setSlow(true)
    );

    after(STAGE_MS, () => setStage(1));

    if (flow === 'error') {
      after(STAGE_MS * 1.5, () => setFailed(true));
    } else if (flow === 'normal') {
      after(STAGE_MS * 2, () => setStage(2));
      after(STAGE_MS * STAGE_COUNT, () => {
        setStage(STAGE_COUNT);
        completeRef.current();
      });
    }

    return () => timers.forEach(clearTimeout);
  }, [flow]);

  return { stage, slow, failed };
};
