"use client";

import {
  TemplateFilterState,
  useTemplateFilter,
} from "@/domains/template/context";
import { Search } from "lucide-react";

import AutoCompleteList from "@/components/molecules/(search)/AutoCompleteList";

import { Command, CommandInput } from "@/components/atoms/Command/Command";
import { Btn } from "@/components/atoms/Btn/Btn";
import useSugessteTemplate from "@/hooks/useSugessteTemplate";

export function TemplateFilters() {
  const [state, dispatch] = useTemplateFilter();
  const { suggestions } = useSugessteTemplate(state.keyword.trim());
  const categorys: TemplateFilterState["category"][] = [
    "전체",
    "모던",
    "클래식",
    "미니멀",
    "로맨틱",
    "빈티지",
  ];

  return (
    <div className="mb-8 space-y-4">
      <Command
        shouldFilter={false}
        className="relative max-w-md overflow-visible rounded-lg border shadow-md"
      >
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

        <CommandInput
          value={state.keyword}
          placeholder="템플릿 검색..."
          onValueChange={(value) => {
            dispatch({ type: "CHANGE_KEYWORD", payload: value });
            dispatch({ type: "OPEN_SUGGESTIONS" });
          }}
        />

        <AutoCompleteList
          suggestions={suggestions}
          isOpen={state.isOpen}
          onSelect={(name) => {
            dispatch({ type: "CHANGE_KEYWORD", payload: name });
            dispatch({ type: "CLOSE_SUGGESTIONS" });
          }}
        />
      </Command>

      <div className="flex flex-wrap gap-2">
        {categorys.map((category) => (
          <Btn
            key={`${category}`}
            variant={state.category === category ? "default" : "outline"}
            onClick={() =>
              dispatch({ type: "SELECT_CATEGORY", payload: category })
            }
            size="sm"
          >
            {category}
          </Btn>
        ))}
      </div>
    </div>
  );
}
