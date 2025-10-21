'use client'

import HeaderNav from "./components/header-nav";

const StandardHeader = () => {
  return (
    <div className="w-full sticky top-0 z-40">
      <HeaderNav />
    </div>
  );
};

export default StandardHeader;
