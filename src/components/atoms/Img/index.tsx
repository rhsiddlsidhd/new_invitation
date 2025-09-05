import Image, { StaticImageData } from "next/image";
import React from "react";

const Img = ({ src }: { src: string | StaticImageData }) => {
  return (
    <Image
      src={src}
      fill
      alt={`예시 이미지`}
      className="object-cover"
      sizes="100%"
      priority
    />
  );
};

export default Img;
