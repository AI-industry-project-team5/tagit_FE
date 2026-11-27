import { Link } from 'react-router-dom';
import { DETAIL_COPY } from '@pages/admin/detail/constants/detailCopy';
import { formatDateTime } from '@shared/utils/format';

interface DetailHeaderProps {
  /** "A-3921" (불러오기 전·없는 번호면 null) */
  analysisId: string | null;
  completedAt: string | null;
  /** 경로 표시의 "이미지 목록" 주소 */
  listPath: string;
  /** "← 목록으로" 주소 (목록에서 왔으면 보던 목록) */
  backPath: string;
}

/** 이미지 목록 › #A-3921 · 검증 결과 상세 · ← 목록으로 */
const DetailHeader = ({
  analysisId,
  completedAt,
  listPath,
  backPath,
}: DetailHeaderProps) => {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-[16px] leading-[1.4]">
      <div className="flex min-w-0 flex-col gap-[6px]">
        <nav aria-label="현재 위치">
          <ol className="flex items-center gap-[8px] text-[13px] font-medium text-neutral-text-sub">
            <li>
              <Link
                to={listPath}
                className="transition-colors duration-200 hover:text-neutral-text"
              >
                이미지 목록
              </Link>
            </li>
            {analysisId && (
              <>
                <li aria-hidden="true">›</li>
                <li aria-current="page">#{analysisId}</li>
              </>
            )}
          </ol>
        </nav>
        <div className="flex flex-wrap items-center gap-x-[12px] gap-y-[4px]">
          <h1 className="text-[28px] font-black text-neutral-text">
            {DETAIL_COPY.title}
          </h1>
          {completedAt && (
            <p className="text-[14px] text-neutral-text-sub">
              {formatDateTime(completedAt)} 분석
            </p>
          )}
        </div>
      </div>
      <Link
        to={backPath}
        className="rounded-[14px] border border-neutral-border bg-white px-[16px] py-[10px] text-[14px] font-bold whitespace-nowrap text-neutral-text transition-colors duration-200 hover:bg-neutral-bg"
      >
        {DETAIL_COPY.back}
      </Link>
    </header>
  );
};

export default DetailHeader;
