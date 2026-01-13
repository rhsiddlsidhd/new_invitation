"use client";

import { useState } from "react";
import Image from "next/image";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Btn } from "@/components/atoms/Btn/Btn";
import { Dialog, DialogContent } from "@/components/atoms/Dialog/Dialog";
import SectionBody from "@/components/molecules/(preview)/SectionBody";
import { GallerySectionProps } from "./gallerySection.mapper";

export function GallerySection({ categories }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.id || "",
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);
  const currentImages = currentCategory?.images || [];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + currentImages.length) % currentImages.length,
    );
  };

  return (
    <SectionBody title="GALLERY" subTitle="웨딩 갤러리">
      {/* Category Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Btn
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="text-sm whitespace-nowrap"
          >
            {category.categoryName}
          </Btn>
        ))}
      </div>

      {/* Image Grid */}
      <div className="flex flex-col gap-4">
        {currentImages.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="bg-muted relative aspect-4/3 w-full overflow-hidden rounded-lg transition-opacity hover:opacity-90"
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="w-full max-w-[95vw] border-none bg-black p-0">
          <div className="relative h-[70vh]">
            <Image
              src={currentImages[currentImageIndex] || ""}
              alt={`Gallery image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />

            {/* Navigation */}
            <Btn
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Btn>
            <Btn
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Btn>

            {/* Close Button */}
            <Btn
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Btn>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
              {currentImageIndex + 1} / {currentImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SectionBody>
  );
}
