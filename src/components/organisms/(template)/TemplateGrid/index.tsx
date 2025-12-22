import Grid from "@/components/atoms/Grid/Grid";
import { TemplateCard } from "../TemplateCard";

import { useTemplateFilter } from "@/domains/template/context";
import useVisibleTemplate from "@/hooks/useVisibleTemplate";

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
