"use client";

import React from "react";
import useSWR from "swr";
import { Eye } from "lucide-react";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/atoms/carousel";
import { Card, CardContent } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { Product } from "@/services/product.service";
import ProductThumbnail from "@/components/molecules/ProductThumbnail";
import ProductLikeBadge from "@/components/molecules/ProductLikeBadge";

import { fetcher } from "@/api/fetcher";
import { ProductCard } from "./ProductCard";

interface ProductCarouselGroupProps {
  category: string;
  title: string;
  description: string;
}

export const ProductCarouselGroup = ({
  category,
  title,
  description,
}: ProductCarouselGroupProps) => {
  const {
    data: products = [],
    error,
    isLoading,
  } = useSWR<Product[]>(`/api/products?category=${category}`, fetcher);

  if (isLoading || error || products.length === 0) {
    return null;
  }

  return (
    <div className="mb-20 last:mb-0">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
        <div className="text-center md:text-left">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {title}
          </h2>
          <p className="text-slate-600">{description}</p>
        </div>
        <Button variant="ghost" className="text-slate-600" asChild>
          <Link href={`/products?category=${category}`}>더보기</Link>
        </Button>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product._id}
              className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="-left-12" />
          <CarouselNext className="-right-12" />
        </div>
      </Carousel>
    </div>
  );
};
