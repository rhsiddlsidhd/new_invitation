import Link from "next/link";
import { Eye, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/atoms/Card/Card";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Btn } from "@/components/atoms/Btn/Btn";
import { Product } from "@/services/product.service";
import Thumbnail from "@/components/atoms/Thumbnail";

export function TemplateCard({ template }: { template: Product }) {
  return (
    <Card className="group border-border overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="bg-muted relative aspect-3/4 overflow-hidden">
          <Thumbnail
            src={template.thumbnail}
            widthPx={600}
            alt={`${template.title} 썸네일`}
          />
          <div className="absolute top-3 right-3 flex gap-2">
            {template.isPremium && (
              <Badge className="bg-accent text-accent-foreground">
                프리미엄
              </Badge>
            )}

            {template.feature && (
              <Badge className="bg-accent text-accent-foreground">추천</Badge>
            )}
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Link href={`/templates/${template._id}`}>
              <Btn size="sm" variant="secondary">
                <Eye className="mr-1 h-4 w-4" />
                미리보기
              </Btn>
            </Link>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="w-full">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="text-foreground text-lg leading-tight font-semibold">
              {template.title}
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
          <Link href={`/templates/${template._id}`} className="flex-1">
            <Btn variant="outline" size="sm" className="w-full bg-transparent">
              <Eye className="mr-1 h-4 w-4" />
              샘플보기
            </Btn>
          </Link>
          <Link href={`/templates/${template._id}`} className="flex-1">
            <Btn size="sm" className="w-full">
              <ShoppingCart className="mr-1 h-4 w-4" />
              제작하기
            </Btn>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
