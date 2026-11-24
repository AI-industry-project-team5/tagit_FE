import type { Feature } from '@shared/types/feature';

/**
 * 기능별 문구 (H-01, H-02, U-04, A-01, A-02)
 * 메인·업로드·분석 중 화면이 같은 컴포넌트를 쓰고 문구만 바뀌도록 모았습니다.
 */

export type StepIconName = 'scan' | 'note' | 'shield';

export interface FeatureStep {
  icon: StepIconName;
  title: string;
  description: string;
}

export interface FeatureCopy {
  /** 기능 선택 카드 */
  cardTitle: string;
  cardDescription: string;
  /** 히어로 설명 (줄바꿈 단위) */
  heroLines: string[];
  /** "이렇게 분석해요 / 이렇게 찾아요" 제목 (강조어, 나머지) */
  stepsHeading: [string, string];
  steps: FeatureStep[];
  /** 사진 선택 전 버튼 문구 / 사진 선택 후 버튼 문구 */
  idleButton: string;
  readyButton: string;
  /** 진행 화면 문구 */
  progress: {
    title: string;
    subtitle: string;
    steps: string[];
  };
}

export const FEATURE_COPY: Record<Feature, FeatureCopy> = {
  ai: {
    cardTitle: 'AI 합성 의심도 확인',
    cardDescription: '메모가 AI로 합성됐는지 확인해요',
    heroLines: [
      '사진 속 메모를 찾아 글씨를 읽고, AI로 합성된 흔적이 있는지',
      '몇 초 만에 분석해드려요.',
    ],
    stepsHeading: ['이렇게', ' 분석해요'],
    steps: [
      {
        icon: 'scan',
        title: '메모 영역 찾기',
        description: '사진 속 포스트잇과 손글씨 메모 위치를 AI가 찾아 표시해요',
      },
      {
        icon: 'note',
        title: '메모 글씨 읽기',
        description:
          '메모에 적힌 닉네임과 날짜를 읽어 판매자 정보와 비교할 수 있어요',
      },
      {
        icon: 'shield',
        title: 'AI 합성 의심도 분석',
        description: '메모가 AI로 합성됐을 가능성을 %와 3단계로 알려줘요',
      },
    ],
    idleButton: '분석 시작하기',
    readyButton: '분석 시작하기',
    progress: {
      title: '사진을 분석하고 있어요',
      subtitle: '보통 10초 안에 끝나요. 창을 닫지 말아주세요.',
      steps: ['메모 영역 찾기', '메모 글씨 읽기', 'AI 합성 여부 분석'],
    },
  },
  similar: {
    cardTitle: '비슷한 이미지 찾기',
    cardDescription: '인터넷에 먼저 올라온 사진인지 찾아요',
    heroLines: [
      '이 사진이 인터넷에 먼저 올라온 적 있는지 찾아서',
      '원본 게시글 링크를 알려드려요.',
    ],
    stepsHeading: ['이렇게', ' 찾아요'],
    steps: [
      {
        icon: 'scan',
        title: '사진 올리기',
        description: '판매자에게 받은 인증 사진을 그대로 올려주세요',
      },
      {
        icon: 'note',
        title: '인터넷에서 검색',
        description: '같은 사진과 비슷한 사진을 인터넷에서 찾아요',
      },
      {
        icon: 'shield',
        title: '원본 링크 확인',
        description: '사진이 올라온 게시글을 미리보기와 링크로 보여줘요',
      },
    ],
    idleButton: '이미지 찾기',
    readyButton: '이미지 찾기 시작하기',
    progress: {
      title: '비슷한 이미지를 찾고 있어요',
      subtitle: '인터넷 검색이라 조금 더 걸릴 수 있어요. 창을 닫지 말아주세요.',
      steps: [
        '사진 특징 분석',
        '인터넷에서 같은 사진 찾기',
        '비슷한 사진 정리하기',
      ],
    },
  },
};

/** 업로드 영역 오류 문구 (U-06, U-07, U-09) */
export const UPLOAD_ERROR_COPY = {
  type: {
    title: 'JPG 또는 PNG 사진만 올릴 수 있어요',
    description: '다른 사진을 선택해주세요',
  },
  size: {
    title: '10MB 이하의 사진만 올릴 수 있어요',
    description: '용량이 작은 사진을 선택해주세요',
  },
  corrupt: {
    title: '사진을 열 수 없어요',
    description: '다른 사진으로 다시 시도해주세요',
  },
} as const;

/** 업로드 관련 토스트 (U-05, U-08) */
export const UPLOAD_TOAST = {
  noPhoto: '먼저 인증 사진을 올려주세요',
  multiple: '사진은 한 장씩 분석할 수 있어요 · 첫 번째 사진만 선택했어요',
} as const;

/** 공통 안내 칩 (혹시, 아직 인증샷을 못 받으셨나요?) */
export const GUIDE_BANNER_COPY = {
  title: '혹시, 아직 인증샷을 못 받으셨나요?',
  description: '판매자에게 이렇게 요청하면 더 정확하게 분석할 수 있어요',
  chips: ['닉네임·날짜 손글씨 메모', '메모와 물건 함께', '원본 사진 그대로'],
} as const;
