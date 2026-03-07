import Grid from "@/components/layout/Grid";

export function RelatedTemplates() {
  // const filtered = relatedTemplates.filter((t) => t.id !== currentTemplateId);

  return (
    <div>
      <h2 className="text-foreground mb-6 text-3xl font-bold">비슷한 템플릿</h2>
      <Grid slot="related-templates">
        {/* {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))} */}
      </Grid>
    </div>
  );
}
