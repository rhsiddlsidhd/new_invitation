import Grid from "@/components/ui/grid";
import { TemplateCard } from "../TemplateCard";

import { useVisibleTemplate } from "@/domains/template";
import { useTemplateFilter } from "@/domains/template/context";

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
