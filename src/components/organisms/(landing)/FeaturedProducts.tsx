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
            category="wedding"
            title="모바일 청첩장"
            description="우리의 소중한 날, 가장 아름다운 시작을 알리는 청첩장"
          />

          <ProductCarouselGroup
            category="first-birthday"
            title="돌잔치 초대장"
            description="우리아이의 첫 번째 생일, 사랑스러운 디자인으로 초대하세요"
          />

          <ProductCarouselGroup
            category="thank-you"
            title="모바일 감사장"
            description="진심 어린 마음을 담아 전하는 정성스러운 인사"
          />
        </div>
      </div>
    </section>
  );
};
