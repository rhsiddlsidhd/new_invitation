"use client";

import React from "react";
import useSWR from "swr";

import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/atoms/carousel";

import { Button } from "@/components/atoms/button";
import { Product } from "@/services/product.service";
import { fetcher } from "@/api/fetcher";
import { ProductCard } from "./ProductCard";

interface ProductCarouselGroupProps {
  category: string;
  title: string;
  description: string;
}

import { Skeleton } from "@/components/atoms/skeleton";

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

  // 에러 발생 시나 데이터가 없을 때는 섹션 전체를 숨김
  if (error || (!isLoading && products.length === 0)) {
    return null;
  }

  // 로딩 중일 때는 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <div className="mb-20 last:mb-0">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 md:h-10 md:w-64" />
            <Skeleton className="h-5 w-64 md:w-80" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-full shrink-0 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <Skeleton className="aspect-4/5 w-full rounded-xl" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
