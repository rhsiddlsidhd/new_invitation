"use client";

import { TemplateFilters } from "@/components/template/TemplateFilters";
import { TemplateGrid } from "@/components/template/TemplateGrid";
import {
  initialFilterState,
  TemplateFilterProvider,
} from "@/context/templateFilter/context";

import React from "react";

const TemplateCatalog = () => {
  // Context API
  //  하나의 Dispatch 로 여러 상태 조각 배포
  return (
    <TemplateFilterProvider initialValue={initialFilterState}>
      {/* Filters */}
      <TemplateFilters />
      {/* Template Grid */}
      <TemplateGrid />
    </TemplateFilterProvider>
  );
};

export default TemplateCatalog;
