import Grid from "@/components/ui/grid";
import { TemplateCard } from "../TemplateCard";

import useVisibleTemplate from "@/hooks/useVisibleTemplate";
import { useTemplateFilter } from "@/context/templateFilter/context";

export function TemplateGrid() {
  const [state] = useTemplateFilter();
  const { visibleTemplates } = useVisibleTemplate({
    keyword: state.keyword.trim(),
    category: state.category,
  });
  return (
    <Grid slot="template">
      {visibleTemplates.map((item) => (
        <TemplateCard key={item.id} template={item} />
      ))}
    </Grid>
  );
}
