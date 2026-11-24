import linkIcon from '@shared/assets/icons/link.svg';
import { formatKoreanDate } from '@shared/utils/format';

/** S-01 · S-02 · 공유 링크로 열린 결과 안내 배너 */
interface SharedBannerProps {
  /** 공유 링크 만료 시각 (ISO 문자열) */
  expiresAt: string;
}

const SharedBanner = ({ expiresAt }: SharedBannerProps) => {
  return (
    <div className="flex items-center gap-[10px] rounded-[14px] bg-brand-green-100 px-[18px] py-[14px]">
      <img src={linkIcon} alt="" className="size-[20px] shrink-0" />
      <p className="text-[14px] leading-[1.45] font-medium text-brand-green-500">
        공유 링크로 열린 결과예요 · {formatKoreanDate(expiresAt)}까지 볼 수
        있어요
      </p>
    </div>
  );
};

export default SharedBanner;
