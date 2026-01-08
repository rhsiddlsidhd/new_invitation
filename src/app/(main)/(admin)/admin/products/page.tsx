import Link from "next/link";
import { Plus } from "lucide-react";
import { Btn } from "@/components/atoms/Btn/Btn";
import { getAllProductsService } from "@/services/product.service";
import { ProductTableRow } from "./_components/ProductTableRow";

const tableColums = [
  "썸네일",
  "상품명",
  "카테고리",
  "가격",
  "타입",
  "상태",
  "통계",
  "우선순위",
  "관리",
];

export default async function ProductsPage() {
  const products = await getAllProductsService();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2 text-3xl font-bold">상품 목록</h1>
          <p className="text-muted-foreground">
            등록된 템플릿 상품을 관리합니다. (총 {products.length}개)
          </p>
        </div>
        <Link href="/admin/products/new">
          <Btn size="lg">
            <Plus className="mr-2 h-5 w-5" />
            상품 등록
          </Btn>
        </Link>
      </div>

      <div className="bg-card overflow-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b">
              <tr>
                {tableColums.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-sm font-semibold"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <ProductTableRow key={product._id} product={product} />
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-muted-foreground py-12 text-center">
            <p>등록된 상품이 없습니다.</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          총 {products.length}개 상품
        </p>
        <div className="flex gap-2">페이지네이션 버튼</div>
      </div>
    </div>
  );
}
