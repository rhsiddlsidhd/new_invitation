import Image, { ImageLoaderProps, StaticImageData } from "next/image";
import React from "react";

/**
 * Cloudinary Loader 함수
 * Next.js가 필요에 따라 호출하며, width와 quality를 자동으로 주입합니다.
 */

const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (typeof src !== "string" || !src.includes("res.cloudinary.com")) {
    return src;
  }

  const params = [`f_auto`, `q_auto`, `w_${width}`];

  if (quality) {
    params.push(`q_${quality}`);
  }

  const paramsString = params.join(",");

  return src.replace("/upload/", `/upload/${paramsString}/`);
};

const LoaderThumbnail = ({
  src,
  alt,
}: {
  src: string | StaticImageData;
  alt?: string;
}) => {
  if (!src) return null;

  return (
    <Image
      loader={cloudinaryLoader}
      src={src}
      fill
      alt={alt ? alt : "이미지"}
      className="object-cover"
      priority
    />
  );
};

export default LoaderThumbnail;
