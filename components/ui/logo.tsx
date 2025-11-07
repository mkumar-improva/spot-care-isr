import React, { FC } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface LogoProps {
  img: string | StaticImageData;
  alt: string;
  href: string;
  className?: string;
  imgLight?: string;
  imgDark?: string;
  onclick?: () => void;
}

const Logo: React.FC<LogoProps> = ({
  img,
  alt,
  href,
  className = "w-24",
  imgLight = "",
  imgDark = "",
  onclick,
}) => {
  return (
    <Link href={href} className={className}>
      <Image
        src={img}
        alt={alt}
        onClick={onclick}
        className={`block ${imgLight} ${imgDark}`}
        loading="lazy"
      />
    </Link>
  );
};

export default Logo;
