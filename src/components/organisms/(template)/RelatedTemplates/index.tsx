import { TemplateCard } from "../TemplateCard";

interface RelatedTemplatesProps {}

export function RelatedTemplates({}: RelatedTemplatesProps) {
  // const filtered = relatedTemplates.filter((t) => t.id !== currentTemplateId);

  return (
    <div>
      <h2 className="text-foreground mb-6 text-3xl font-bold">비슷한 템플릿</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))} */}
      </div>
    </div>
  );
}
