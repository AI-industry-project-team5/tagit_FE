import { useRef, useState } from 'react';
import type { ChangeEvent, DragEvent, MouseEvent } from 'react';
import Button from '@shared/components/ui/Button';
import uploadIcon from '@shared/assets/icons/upload.svg';
import alertIcon from '@shared/assets/icons/alert-circle.svg';
import { UPLOAD_ERROR_COPY } from '@shared/constants/featureCopy';
import { ACCEPTED_IMAGE_TYPES } from '@shared/utils/imageFile';
import type { ImageFileError } from '@shared/utils/imageFile';
import { formatFileSize } from '@shared/utils/format';
import type { UserPhoto } from '@shared/contexts/UserPhotoContext';

/**
 * U-01 ~ U-04, U-06 ~ U-09 · 업로드 영역 (기능 1·2 공통)
 * 기본 / 드래그 / 업로드 완료 / 오류 4가지 상태를 하나의 컴포넌트로 표현하고,
 * 기능에 따라 달라지는 것은 버튼 문구(buttonLabel)뿐입니다.
 */
interface UploadDropzoneProps {
  photo: UserPhoto | null;
  error: ImageFileError | null;
  buttonLabel: string;
  /** 선택·드롭된 파일들 (검증은 상위에서 처리) */
  onFiles: (files: File[]) => void;
  onStart: () => void;
}

type DropzoneState = 'idle' | 'dragging' | 'ready' | 'error';

const SHELL_CLASS: Record<DropzoneState, string> = {
  idle: 'border-2 border-dashed border-brand-green-300 bg-white hover:border-brand-green-500',
  ready: 'border-2 border-dashed border-brand-green-300 bg-white',
  dragging:
    'border-[3px] border-solid border-brand-green-500 bg-brand-green-100',
  error: 'border-2 border-solid border-verdict-danger bg-white',
};

const hasFiles = (event: DragEvent<HTMLDivElement>) =>
  Array.from(event.dataTransfer.types).includes('Files');

const UploadDropzone = ({
  photo,
  error,
  buttonLabel,
  onFiles,
  onStart,
}: UploadDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);
  const [dragging, setDragging] = useState(false);

  const state: DropzoneState = dragging
    ? 'dragging'
    : error
      ? 'error'
      : photo
        ? 'ready'
        : 'idle';

  const openPicker = () => inputRef.current?.click();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    // 같은 파일을 다시 선택해도 change 이벤트가 발생하도록 초기화
    event.target.value = '';
    if (files.length > 0) {
      onFiles(files);
    }
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    if (!hasFiles(event)) return;
    event.preventDefault();
    dragDepth.current += 1;
    setDragging(true);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (!hasFiles(event)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (!hasFiles(event)) return;
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) {
      setDragging(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragDepth.current = 0;
    setDragging(false);
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      onFiles(files);
    }
  };

  // 업로드 바 어디를 눌러도 파일 선택 창이 열림 (U-02). 버튼·링크는 제외
  const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
    if (state === 'ready') return;
    if ((event.target as HTMLElement).closest('button')) return;
    openPicker();
  };

  const errorCopy = error ? UPLOAD_ERROR_COPY[error] : null;

  return (
    <div
      onClick={handleContainerClick}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex w-full flex-col gap-[16px] rounded-[36px] px-[20px] py-[20px] shadow-card transition-all duration-300 ease-out sm:flex-row sm:items-center sm:gap-[24px] sm:pr-[20px] sm:pl-[28px] ${SHELL_CLASS[state]} ${
        state === 'ready' ? '' : 'cursor-pointer'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        multiple
        className="sr-only"
        tabIndex={-1}
        onChange={handleInputChange}
      />

      {state === 'ready' && photo ? (
        <>
          <img
            src={photo.previewUrl}
            alt="업로드한 사진 미리보기"
            className="size-[64px] shrink-0 rounded-[16px] object-cover"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-[2px] leading-[1.4]">
            <p className="truncate text-[19px] font-bold text-neutral-text">
              {photo.name}
            </p>
            <p className="text-[14px] font-medium text-neutral-text-sub">
              {formatFileSize(photo.size)} ·{' '}
              <button
                type="button"
                onClick={openPicker}
                className="cursor-pointer text-brand-green-500 underline transition-opacity duration-200 hover:opacity-70"
              >
                다른 사진 선택
              </button>
            </p>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={openPicker}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-[24px] text-left"
        >
          <span
            className={`flex size-[64px] shrink-0 items-center justify-center rounded-[32px] ${
              state === 'error' ? 'bg-verdict-danger-bg' : 'bg-brand-green-100'
            }`}
          >
            <img
              src={state === 'error' ? alertIcon : uploadIcon}
              alt=""
              className="size-[28px]"
            />
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-[2px] leading-[1.4]">
            <span
              className={`text-[19px] font-bold ${
                state === 'error'
                  ? 'text-verdict-danger'
                  : state === 'dragging'
                    ? 'text-brand-green-500'
                    : 'text-neutral-text'
              }`}
            >
              {state === 'error' && errorCopy
                ? errorCopy.title
                : state === 'dragging'
                  ? '여기에 놓으면 업로드돼요'
                  : '인증 사진을 끌어다 놓거나 클릭해서 올려주세요'}
            </span>
            <span className="text-[14px] text-neutral-text-sub">
              {state === 'error' && errorCopy
                ? errorCopy.description
                : 'JPG, PNG · 최대 10MB · 한 장'}
            </span>
          </span>
        </button>
      )}

      <Button
        variant={state === 'ready' ? 'primary' : 'disabled'}
        onClick={onStart}
        className="w-full shrink-0 sm:w-[220px]"
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default UploadDropzone;
