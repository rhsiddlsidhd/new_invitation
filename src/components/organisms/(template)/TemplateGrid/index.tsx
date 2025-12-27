import Grid from "@/components/atoms/Grid/Grid";
import { TemplateCard } from "../TemplateCard";

import useVisibleTemplate from "@/hooks/useVisibleTemplate";
import { useTemplateFilter } from "@/context/templateFilter/reducer";
import { Product } from "@/services/product.service";

export function TemplateGrid({ data }: { data: Product[] }) {
  const [state] = useTemplateFilter();
  const { visibleTemplates } = useVisibleTemplate({
    state,
    category: state.category,
    data,
  });
  return (
    <Grid slot="template">
      {visibleTemplates.map((item) => (
        <TemplateCard key={item._id} template={item} />
      ))}
    </Grid>
  );
}
