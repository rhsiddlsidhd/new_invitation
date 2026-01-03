"use client";

import Thumbnail from "@/components/atoms/Thumbnail";
import { useIsMobile } from "@/hooks/use-mobile";

const ResponseThumbnail = ({
  src,
  widthPx,
}: {
  src: string;
  widthPx: number;
}) => {
  const isMobile = useIsMobile();

  return <Thumbnail src={src} widthPx={isMobile ? widthPx : widthPx / 2} />;
};

export default ResponseThumbnail;
