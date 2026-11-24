import { FOOTER_COPYRIGHT, FOOTER_NOTICE } from '@shared/constants/userCopy';

/** C-02 · 메인 하단 고지 (Figma 푸터 기준, 저작권 문구 포함) */
const Footer = () => {
  return (
    <footer className="flex flex-col gap-[8px] bg-neutral-bg px-[24px] pt-[36px] pb-[40px] leading-[1.4] md:px-[120px]">
      <p className="text-[18px] font-black text-brand-green-500">TAG:IT</p>
      <p className="text-[13px] text-neutral-text-sub">{FOOTER_NOTICE}</p>
      <p className="text-[12px] text-neutral-text-muted">{FOOTER_COPYRIGHT}</p>
    </footer>
  );
};

export default Footer;
