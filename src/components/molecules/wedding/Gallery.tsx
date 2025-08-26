import GalleryCard from "@/components/organisms/GalleryCard";
import React, { useMemo, useState } from "react";
import { IGallery } from "@/models/invitationSchma";

import { PlusIcon } from "@/components/atoms/Icon";
import { motion } from "framer-motion";

const Gallery = ({ data }: { data: IGallery[] }) => {
  const [isAdd, setIsAdd] = useState<boolean>(false);

  const viewData = useMemo(
    () => (isAdd ? data : data.slice(0, 1)),
    [data, isAdd],
  );

  return (
    <div className="relative pb-8">
      {viewData.map((gallery, i) => {
        return (
          <motion.div
            key={gallery.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
          >
            <GalleryCard
              type={gallery.type}
              images={gallery.images}
              readOnly={true}
              size="full"
            />
          </motion.div>
        );
      })}

      {!isAdd && (
        <button
          type="button"
          onClick={() => setIsAdd(true)}
          className="absolute bottom-0 left-1/2 flex w-fit -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-gray-300 bg-[linear-gradient(to_bottom,transparent_0%,white_30%,white_100%)] p-3 text-xs"
        >
          <motion.span className="absolute">
            <PlusIcon className="text-gray-500" size={16} />
          </motion.span>
        </button>
      )}
    </div>
  );
};

export default Gallery;
