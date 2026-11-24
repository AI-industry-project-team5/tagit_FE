import Footer from '@shared/components/layout/Footer';
import Toast from '@shared/components/ui/Toast';
import { FEATURE_COPY } from '@shared/constants/featureCopy';
import FeatureSelector from '@pages/user/upload/components/FeatureSelector';
import GuideBanner from '@pages/user/upload/components/GuideBanner';
import HeroIllustration from '@pages/user/upload/components/HeroIllustration';
import StepGuide from '@pages/user/upload/components/StepGuide';
import UploadDropzone from '@pages/user/upload/components/UploadDropzone';
import { useUploadFlow } from '@pages/user/upload/hooks/useUploadFlow';

/**
 * 1-A / 1-B 메인 · 2-A 사진 업로드 완료 · U-a ~ U-f 업로드 오류
 * 기능 선택에 따라 설명·단계 안내·버튼 문구만 바뀌고, 올려둔 사진은 유지됩니다. (H-01, H-02)
 */
const UploadPage = () => {
  const { feature, setFeature, photo, error, toast, handleFiles, handleStart } =
    useUploadFlow();
  const copy = FEATURE_COPY[feature];

  return (
    <>
      <main className="flex-1 animate-fade-in">
        <div className="px-[16px] md:px-[40px]">
          <section className="flex flex-col gap-[24px] overflow-hidden rounded-[40px] bg-gradient-to-r from-[#e4f8ec] via-[#f2fcf6] via-[55%] to-[#fff9e0] px-[24px] pt-[48px] pb-[40px] md:rounded-[56px] md:px-[80px] md:pt-[72px] md:pb-[64px]">
            <div className="flex items-center gap-[40px]">
              <div className="flex min-w-0 flex-1 flex-col items-start gap-[20px]">
                <p className="rounded-[30px] bg-white px-[14px] py-[7px] text-[14px] leading-[1.4] font-bold text-brand-green-500">
                  중고거래 인증샷 AI 검증
                </p>
                <h1 className="text-[40px] leading-[1.28] font-black text-neutral-text md:text-[56px]">
                  그 인증샷,
                  <br />
                  <span className="text-brand-green-500">진짜</span> 찍은
                  걸까요?
                </h1>
                <p className="text-[16px] leading-[1.4] text-neutral-text-sub md:text-[19px]">
                  {copy.heroLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
              <HeroIllustration />
            </div>

            <p className="text-[15px] leading-[1.4] font-bold text-neutral-text-sub">
              무엇을 확인할까요?
            </p>
            <FeatureSelector value={feature} onChange={setFeature} />
            <UploadDropzone
              photo={photo}
              error={error}
              buttonLabel={photo && !error ? copy.readyButton : copy.idleButton}
              onFiles={handleFiles}
              onStart={handleStart}
            />
          </section>
        </div>

        <StepGuide heading={copy.stepsHeading} steps={copy.steps} />
        <GuideBanner />
      </main>
      <Footer />
      <Toast toast={toast} />
    </>
  );
};

export default UploadPage;
