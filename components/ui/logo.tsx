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
}

const Logo: React.FC<LogoProps> = ({
  img,
  alt,
  href,
  className = "w-24",
  imgLight = "",
  imgDark = "",
}) => {
  return (
    <Link href={href} className={className}>
      <Image
        src={img}
        alt={alt}
        className={`block ${imgLight} ${imgDark}`}
        loading="lazy"
      />
    </Link>
  );
};

export default Logo;
