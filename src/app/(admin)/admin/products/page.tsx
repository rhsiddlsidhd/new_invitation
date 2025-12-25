import Link from "next/link";

import { Plus } from "lucide-react";
import { Btn } from "@/components/atoms/Btn/Btn";
import { getAllProductsService } from "@/services/product.service";
import { getAllPremiumFeatureService } from "@/services/premiumFeature.service";
import { ProductTableRow } from "./_components/ProductTableRow";

export default async function ProductsPage() {
  const [products, premiumFeatures] = await Promise.all([
    getAllProductsService(),
    getAllPremiumFeatureService(),
  ]);

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
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  썸네일
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  상품명
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  카테고리
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  가격
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  타입
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  상태
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  통계
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  우선순위
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <ProductTableRow
                  key={product._id}
                  product={product}
                  premiumFeatures={premiumFeatures}
                />
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

      {/* 페이지네이션 영역 - 나중에 추가 */}
      {/* <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          총 {products.length}개 상품
        </p>
        <div className="flex gap-2">
          페이지네이션 버튼
        </div>
      </div> */}
    </div>
  );
}
