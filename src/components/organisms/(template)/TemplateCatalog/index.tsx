"use client";

import { TemplateFilters } from "@/components/template/TemplateFilters";
import { TemplateGrid } from "@/components/template/TemplateGrid";
import TemplateProvider from "@/context/template/template.provider";
import React from "react";

const TemplateCatalog = () => {
  // Context API
  //  하나의 Dispatch 로 여러 상태 조각 배포
  return (
    <TemplateProvider>
      {/* Filters */}
      <TemplateFilters />
      {/* Template Grid */}
      <TemplateGrid />
    </TemplateProvider>
  );
};

export default TemplateCatalog;
