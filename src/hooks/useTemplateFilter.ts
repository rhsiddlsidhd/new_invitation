import {
  TemplateActionContext,
  TemplateStateContext,
} from "@/context/template/template.context";
import { useContext } from "react";

const useTemplateFilter = () => {
  const dispatch = useContext(TemplateActionContext);
  const state = useContext(TemplateStateContext);

  if (!state || !dispatch) {
    throw new Error("useTemplateFilter must be used within TemplateProvider");
  }

  return { dispatch, state };
};

export default useTemplateFilter;
