import React from "react";

interface GalleryGridCard {
  className: string;
  children?: React.ReactNode;
}

const GalleryGridCard = ({ children, className }: GalleryGridCard) => {
  return <div className={`${className}`}>{children}</div>;
};

export default GalleryGridCard;
