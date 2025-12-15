import React, { useReducer } from "react";
import { TemplateFilterAction, TemplateFilterState } from "./template.type";
import {
  TemplateActionContext,
  TemplateStateContext,
} from "./template.context";

function templateFilterReducer(
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

const initialState: TemplateFilterState = {
  keyword: "",
  category: "전체",
  isOpen: false,
};

const TemplateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(templateFilterReducer, initialState);

  return (
    <TemplateStateContext.Provider value={state}>
      <TemplateActionContext.Provider value={dispatch}>
        {children}
      </TemplateActionContext.Provider>
    </TemplateStateContext.Provider>
  );
};

export default TemplateProvider;
