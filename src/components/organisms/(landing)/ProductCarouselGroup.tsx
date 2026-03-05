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
              <Card className="group overflow-hidden border-none bg-transparent shadow-none transition-all duration-300">
                <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 shadow-md">
                  {product.feature && (
                    <Badge className="bg-primary absolute top-4 left-4 z-10 border-none text-white shadow-sm">
                      BEST
                    </Badge>
                  )}
                  <ProductThumbnail
                    src={product.thumbnail}
                    alt={product.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full shadow-lg"
                        asChild
                      >
                        <Link href={product.previewUrl || "#"}>
                          <Eye className="mr-2 h-4 w-4" /> 미리보기
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400">
                      좋아요 {product.likes.length}개
                    </span>
                  </div>
                  <h3 className="group-hover:text-primary mb-2 truncate text-lg font-bold text-slate-900 transition-colors">
                    <Link href={`/products/${product._id}`}>
                      {product.title}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-primary text-lg font-extrabold">
                      {product.price.toLocaleString()}원
                    </span>
                  </div>
                </CardContent>
              </Card>
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
