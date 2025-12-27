"use client";
import useSWR from "swr";
import {
  initialFilterState,
  TemplateFilterProvider,
} from "@/context/templateFilter/reducer";
import React from "react";
import { TemplateFilters } from "../TemplateFilters";
import { TemplateGrid } from "../TemplateGrid";
import { Product } from "@/services/product.service";
import { fetcher } from "@/api/fetcher";

const TemplateCatalog = ({ products }: { products: Product[] }) => {
  // Context API
  //  하나의 Dispatch 로 여러 상태 조각 배포
  const { data } = useSWR<Product[]>("api/products", fetcher, {
    fallbackData: products,
  });

  return (
    <TemplateFilterProvider initialValue={initialFilterState}>
      {/* Filters */}
      <TemplateFilters data={data ?? []} />
      {/* Template Grid */}
      <TemplateGrid data={data ?? []} />
    </TemplateFilterProvider>
  );
};

export default TemplateCatalog;
