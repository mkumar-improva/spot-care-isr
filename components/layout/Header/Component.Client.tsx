'use client'

import { usePathname } from 'next/navigation';
import HeaderNav from "./components/header-nav";

const StandardHeader = () => {
  const pathname = usePathname();
  const isBlogPage = pathname === '/blog';

  if (isBlogPage) return null;

  return (
    <div className="w-full sticky top-0 z-40">
      <HeaderNav />
    </div>
  );
};

export default StandardHeader;
