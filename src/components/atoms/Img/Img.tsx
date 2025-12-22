import Image, { StaticImageData } from "next/image";
import React from "react";

const Img = ({ src }: { src: string | StaticImageData }) => {
  if (!src) return null;

  const optimizedSrc =
    typeof src === "string" && src.includes("res.cloudinary.com")
      ? src.replace("/upload/", "/upload/f_auto,q_auto,w_800/")
      : src;

  return (
    <Image
      src={optimizedSrc}
      fill
      alt={`예시 이미지`}
      className="object-cover object-left"
      sizes="100%"
      priority
    />
  );
};

export default Img;
