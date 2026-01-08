
import React from "react";
import Img from "@/components/atoms/Thumbnail";
import { ICoupleInfo } from "@/models/coupleInfo.model";

type GalleryImageGroup = ICoupleInfo["galleryImages"][0];

const NewGallery = ({
  galleryImages,
}: {
  galleryImages: GalleryImageGroup[];
}) => {
  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      {galleryImages.map((group) => (
        <div key={group.category}>
          <h3 className="text-center text-lg font-semibold mb-4 capitalize">
            {group.category}
          </h3>
          <div className="flex flex-col gap-4">
            {group.urls.map((url, index) => (
              <div key={index} className="relative aspect-[3/4] w-full">
                <Img src={url} alt={`${group.category} image ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewGallery;
