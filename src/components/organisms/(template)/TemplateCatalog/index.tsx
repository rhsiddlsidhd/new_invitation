"use client";

import {
  initialFilterState,
  TemplateFilterProvider,
} from "@/context/templateFilter/reducer";
import React from "react";
import { TemplateFilters } from "../TemplateFilters";
import { TemplateGrid } from "../TemplateGrid";

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
