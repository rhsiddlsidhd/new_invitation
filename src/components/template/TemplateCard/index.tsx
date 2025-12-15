import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart } from "lucide-react";

interface TemplateCardProps {
  template: {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    category: string;
    featured: boolean;
  };
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="group border-border overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="bg-muted relative aspect-[3/4] overflow-hidden">
          <Image
            src={template.thumbnail || "/assets/images/default/placeholder.svg"}
            alt={template.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {template.featured && (
            <Badge className="bg-accent text-accent-foreground absolute top-3 right-3">
              인기
            </Badge>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Link href={`/templates/${template.id}`}>
              <Button size="sm" variant="secondary">
                <Eye className="mr-1 h-4 w-4" />
                미리보기
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="w-full">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="text-foreground text-lg leading-tight font-semibold">
              {template.name}
            </h3>
            <Badge variant="outline" className="shrink-0 text-xs">
              {template.category}
            </Badge>
          </div>
          <p className="text-primary text-lg font-bold">
            {template.price.toLocaleString()}원
          </p>
        </div>

        <div className="flex w-full gap-2">
          <Link href={`/templates/${template.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
            >
              <Eye className="mr-1 h-4 w-4" />
              샘플보기
            </Button>
          </Link>
          <Link href={`/templates/${template.id}`} className="flex-1">
            <Button size="sm" className="w-full">
              <ShoppingCart className="mr-1 h-4 w-4" />
              제작하기
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
