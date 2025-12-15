import { createContext, Dispatch } from "react";
import { TemplateFilterAction, TemplateFilterState } from "./template.type";

export const TemplateStateContext = createContext<TemplateFilterState | null>(
  null,
);

export const TemplateActionContext =
  createContext<Dispatch<TemplateFilterAction> | null>(null);
