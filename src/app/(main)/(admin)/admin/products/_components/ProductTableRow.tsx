import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/atoms/Badge/Badge";

import { Product } from "@/services/product.service";
import LoaderThumbnail from "@/components/atoms/LoaderThumbnail";
import ProductTableRowAction from "@/components/organisms/(admin)/ProductTableRowAction.tsx";
import ProductTableRowSelect from "@/components/organisms/(admin)/ProductTableRowSelect";

export interface ProductTableRowProps {
  product: Product;
}

export function ProductTableRow({ product }: ProductTableRowProps) {
  return (
    <tr className="hover:bg-muted/50 transition-colors">
      <td className="px-4 py-3">
        <div className="relative h-16 w-16 overflow-hidden rounded">
          <LoaderThumbnail
            src={product.thumbnail}
            sizes="128px"
            alt={`${product.title} 이미지`}
          />
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="max-w-xs">
          <p className="truncate font-medium">{product.title}</p>
          <p className="text-muted-foreground truncate text-sm">
            {product.description}
          </p>
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge variant="outline">{product.category}</Badge>
      </td>
      <td className="px-4 py-3">
        <span className="font-semibold">
          {product.price.toLocaleString()}원
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col gap-1">
          {product.isPremium && (
            <Badge className="bg-accent text-accent-foreground w-fit">
              프리미엄
            </Badge>
          )}
          {product.feature && (
            <Badge variant="secondary" className="w-fit">
              추천
            </Badge>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <ProductTableRowSelect product={product} />
      </td>
      <td className="px-4 py-3">
        <div className="text-muted-foreground flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{product.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            <span>{product.likes.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <ShoppingCart className="h-3 w-3" />
            <span>{product.salesCount}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="font-mono text-sm">{product.priority}</span>
      </td>
      <td className="px-4 py-3">
        <ProductTableRowAction product={product} />
      </td>
    </tr>
  );
}
