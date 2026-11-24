import { Link } from 'react-router-dom';
import { paths } from '@routes/path';

/** C-01 · TAG:IT 로고만 표시하고, 클릭하면 메인으로 이동합니다. */
const Header = () => {
  return (
    <header className="flex h-[80px] shrink-0 items-center bg-white px-[24px] md:px-[80px]">
      <Link
        to={paths.upload}
        className="cursor-pointer text-[20px] leading-normal font-bold text-brand-green-500 transition-opacity duration-200 hover:opacity-70"
      >
        TAG:IT
      </Link>
    </header>
  );
};

export default Header;
