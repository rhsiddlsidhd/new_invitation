import { TemplateCard } from "../TemplateCard";

interface RelatedTemplatesProps {
  currentTemplateId: number;
}

const relatedTemplates = [
  {
    id: 2,
    name: "모던 심플",
    price: 25000,
    thumbnail: "/modern-minimal-wedding-invitation.jpg",
    category: "모던",
    featured: false,
  },
  {
    id: 3,
    name: "클래식 화이트",
    price: 32000,
    thumbnail: "/classic-white-wedding-invitation.jpg",
    category: "클래식",
    featured: true,
  },
  {
    id: 5,
    name: "골드 엘레강스",
    price: 35000,
    thumbnail: "/gold-elegant-wedding-invitation.jpg",
    category: "로맨틱",
    featured: true,
  },
  {
    id: 7,
    name: "플로럴 드림",
    price: 30000,
    thumbnail: "/floral-dream-wedding-invitation.jpg",
    category: "로맨틱",
    featured: false,
  },
];

export function RelatedTemplates({ currentTemplateId }: RelatedTemplatesProps) {
  const filtered = relatedTemplates.filter((t) => t.id !== currentTemplateId);

  return (
    <div>
      <h2 className="text-foreground mb-6 text-3xl font-bold">비슷한 템플릿</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}
