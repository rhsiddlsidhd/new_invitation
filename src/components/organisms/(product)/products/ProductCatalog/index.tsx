"use client";

import useSWR from "swr";
import {
  initialFilterState,
  ProductFilterProvider,
} from "@/context/productFilter/reducer";
import React from "react";
import { ProductFilters } from "@/components/organisms/(product)/products/ProductFilters";
import { ProductGrid } from "@/components/organisms/(product)/products/ProductGrid";
import { Product } from "@/services/product.service";
import { fetcher } from "@/api/fetcher";

const ProductCatalog = ({
  products,
  category,
}: {
  products: Product[];
  category: string;
}) => {
  // 쿼리 파라미터가 포함된 useSWR 키 설정
  const { data } = useSWR<Product[]>(
    `api/products?category=${category}`,
    fetcher,
    {
      fallbackData: products,
    },
  );

  return (
    <ProductFilterProvider initialValue={initialFilterState}>
      {/* Filters */}
      <ProductFilters data={data ?? []} category={category} />
      {/* Product Grid */}
      <ProductGrid data={data ?? []} />
    </ProductFilterProvider>
  );
};

export default ProductCatalog;
