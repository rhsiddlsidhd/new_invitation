import Link from "next/link";

import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { Btn } from "@/components/atoms/Btn/Btn";
import { Card, CardContent } from "@/components/atoms/Card/Card";
import { Badge } from "@/components/atoms/Badge/Badge";

const products = [
  {
    id: 1,
    title: "엘레강트 로즈 청첩장",
    category: "클래식",
    price: 15000,
    isPremium: true,
    thumbnail: "elegant-wedding-invitation-with-roses.jpg",
  },
  {
    id: 2,
    title: "모던 미니멀 청첩장",
    category: "모던",
    price: 12000,
    isPremium: false,
    thumbnail: "modern-minimal-wedding-invitation.jpg",
  },
  {
    id: 3,
    title: "클래식 화이트 청첩장",
    category: "클래식",
    price: 18000,
    isPremium: true,
    thumbnail: "classic-white-wedding-invitation.jpg",
  },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2 text-3xl font-bold">상품 목록</h1>
          <p className="text-muted-foreground">
            등록된 템플릿 상품을 관리합니다.
          </p>
        </div>
        <Link href="/admin/products/new">
          <Btn>
            <Plus className="mr-2 h-4 w-4" />
            상품 등록
          </Btn>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative aspect-4/3">
              <Image
                src={
                  `/assets/images/template/${product.thumbnail}` ||
                  "/placeholder.svg"
                }
                alt={product.title}
                fill
              />
              {product.isPremium && (
                <Badge className="bg-accent text-accent-foreground absolute top-2 right-2">
                  프리미엄
                </Badge>
              )}
            </div>
            <CardContent className="space-y-3 p-4">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                <h3 className="text-foreground font-semibold">
                  {product.title}
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary text-lg font-bold">
                  {product.price.toLocaleString()}원
                </span>
                <div className="flex gap-2">
                  <Btn size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Btn>
                  <Btn size="sm" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Btn>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
