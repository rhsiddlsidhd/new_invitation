"use client";
import React, { useEffect, useRef } from "react";
import Card from "@/components/atoms/Card/Card";
import Img from "@/components/atoms/Thumbnail";
import { useRouter } from "next/navigation";
import { PRODUCT_LIST } from "@/shared/constants";
import { useSetClearProduct } from "@/domains/product";

const TemplateGallery = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const clearProduct = useSetClearProduct();

  useEffect(() => {
    clearProduct();
  }, [clearProduct]);

  const router = useRouter();

  const handleNavigation = ({
    category,
    id,
  }: {
    category: string;
    id: string;
  }) => {
    router.push(`/products/${category}/${id}`);
  };

  return (
    <div
      className="relative bg-white px-4 pt-4 pb-[60px] max-sm:pt-[60px]"
      ref={listContainerRef}
    >
      <div>
        <p className="text-center">상품 페이지</p>
      </div>
      <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCT_LIST.map((card, i) => {
          return (
            <Card
              key={i}
              className={`aspect-[5/8] w-full cursor-pointer shadow`}
              ref={cardRef}
              onClick={() =>
                handleNavigation({ category: card.category, id: card.id })
              }
            >
              <div className="relative h-3/4 w-full">
                <Img src={`/${card.thumbnail}.webp`} />
              </div>
              <div className="flex h-1/4 flex-col justify-end gap-2 bg-[#E7E6E2] p-2">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">{card.category}</p>
                  <p className="text-sm text-gray-600">{card.price}원</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateGallery;
