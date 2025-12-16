import { useReducer } from "react";
import { TemplateFilterAction, TemplateFilterState } from "./type";
import { createStateContext } from "../createStateContext";

const initialFilterState: TemplateFilterState = {
  keyword: "",
  category: "전체",
  isOpen: false,
};

function filterReducer(
  state: TemplateFilterState,
  action: TemplateFilterAction,
): TemplateFilterState {
  switch (action.type) {
    case "CHANGE_KEYWORD":
      return {
        ...state,
        keyword: action.payload,
      };

    case "SELECT_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    case "OPEN_SUGGESTIONS":
      return {
        ...state,
        isOpen: true,
      };
    case "CLOSE_SUGGESTIONS":
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
}

export const [TemplateFilterProvider, useTemplateFilter] = createStateContext(
  (init: TemplateFilterState) => useReducer(filterReducer, init),
);

export { initialFilterState };
