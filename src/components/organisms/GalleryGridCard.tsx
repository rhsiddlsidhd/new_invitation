import React from "react";

interface GalleryGridCard {
  children?: React.ReactNode;
}

const GalleryGridCard = ({ children }: GalleryGridCard) => {
  return (
    <div className="grid aspect-[5/8] w-34 grid-rows-2 gap-0.5 overflow-hidden rounded border-2 border-gray-200 bg-gray-100">
      {/* {Array.from({ length: typeMap[type] }, (_, i) => {
        return (
          <li key={i} className="relative border-2 border-gray-200">
            {children}
          </li>
        );
      })} */}
      {children}
    </div>
  );
};

export default GalleryGridCard;
