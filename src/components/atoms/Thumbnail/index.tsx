import Image, { StaticImageData } from "next/image";
import React from "react";

/**
 *
 * cloudinary 경로의 이미지로 전달받는 경우
 * 라이브러리를 통한 화질, 포맷, 사이즈 변환하여 전달
 * 이를 통해 이미지의 질과 크기가 조절되어 보다 빠른 이미지를 받아볼 수 있다.
 */

const Thumbnail = ({
  src,
  widthPx,
  alt,
}: {
  src: string | StaticImageData;
  widthPx: number;
  alt?: string;
}) => {
  if (!src) return null;

  const cloudinaryUrl =
    typeof src === "string" && src.includes("res.cloudinary.com") && widthPx
      ? src.replace("/upload/", `/upload/f_auto,q_auto,w_${widthPx}/`)
      : src;

  return (
    <Image
      src={cloudinaryUrl}
      fill
      alt={alt ? alt : "이미지"}
      sizes={`${widthPx}px`}
      className="object-cover"
      priority
    />
  );
};

export default Thumbnail;
