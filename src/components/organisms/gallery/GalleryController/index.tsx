import { GalleryData } from "@/types";
import Btn from "../../../atoms/Btn";
import { AnimatePresence } from "motion/react";
import { motion } from "framer-motion";
import GalleryCard from "../../../molecules/gallery/GalleryCard";
import { PlusIcon } from "../../../atoms/Icon";

const GalleryController = ({
  activeType,
  onActiveType,
  onAddGallery,
}: {
  activeType: GalleryData["type"];
  onActiveType: (w: GalleryData["type"]) => void;
  onAddGallery: () => void;
}) => {
  const galleryTypes: GalleryData["type"][] = ["A", "B", "C", "D", "E"];
  return (
    <div>
      <div className="flex max-sm:flex-col-reverse">
        <div className="grid flex-1/4 gap-2">
          {galleryTypes.map((w, i) => {
            return (
              <Btn
                key={i}
                bgColor="bg-blue-300"
                onClick={(e) => {
                  e.preventDefault();
                  onActiveType(w);
                }}
              >{`${w}타입`}</Btn>
            );
          })}
        </div>
        <ul className="relative flex min-h-80 flex-3/4 items-center">
          <AnimatePresence mode="wait">
            <motion.li
              key={activeType}
              className="round-lg absolute left-1/2 h-fit w-fit -translate-x-1/2 bg-white p-2 shadow-sm"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <GalleryCard type={activeType} readOnly={true} />
            </motion.li>
          </AnimatePresence>
        </ul>
      </div>
      <Btn
        bgColor="bg-blue-300"
        className="mt-2 w-full"
        onClick={(e) => {
          e.preventDefault();
          onAddGallery();
        }}
      >
        <PlusIcon className="m-auto" />
      </Btn>
    </div>
  );
};

export default GalleryController;
