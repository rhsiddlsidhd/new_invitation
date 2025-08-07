import Image, { StaticImageData } from "next/image";
import React from "react";

const Img = ({ src }: { src: string | StaticImageData }) => {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        fill
        alt={`예시 이미지`}
        className="object-cover"
        sizes="100%"
        priority
      />
    </div>
  );
};

export default Img;
