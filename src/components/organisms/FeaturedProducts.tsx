import React from "react";
import { ProductCarouselGroup } from "./ProductCarouselGroup";

export const FeaturedProducts = () => {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            베스트 디자인 상품
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            가장 많은 사랑을 받은 디자인들을 카테고리별로 확인해보세요.
          </p>
        </div>

        <div className="space-y-24">
          <ProductCarouselGroup
            category="invitation"
            title="초대장"
            description="소중한 순간을 함께할 분들께 마음을 전하는 초대장"
          />

          <ProductCarouselGroup
            category="business-card"
            title="명함"
            description="나를 가장 잘 표현하는 세련된 디지털 명함"
          />
        </div>
      </div>
    </section>
  );
};
