"use client";

import { Eye, Sparkles } from "lucide-react";
import { Product } from "@/services/product.service";
import ProductThumbnail from "@/components/molecules/ProductThumbnail";
import { calculatePrice } from "@/utils/price";
import { useRouter } from "next/navigation";
import { SubCategory, subCategoryLabels } from "@/utils/category";

const PREVIEW_ID = process.env.NEXT_PUBLIC_PREVIEW_COUPLEINFO_ID;
if (!PREVIEW_ID) throw new Error("PREVIEW_ID is not defined");

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const finalPrice =
    product.discount?.value > 0
      ? calculatePrice(product.price, product.discount)
      : product.price;

  const hasDiscount = product.discount?.value > 0;
  const discountLabel = hasDiscount
    ? product.discount.discountType === "rate"
      ? `${Math.round(product.discount.value * 100)}% OFF`
      : `${product.discount.value.toLocaleString()}원 할인`
    : null;

  return (
    <article
      className="group relative cursor-pointer"
      onClick={() => router.push(`/products/${product._id}`)}
    >
      {/* Image — the card itself */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">

        {/* Thumbnail with zoom on hover */}
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]">
          <ProductThumbnail
            src={product.thumbnail}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            alt={`${product.title} 썸네일`}
          />
        </div>

        {/* Persistent bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Hover overlay deepens */}
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Top badges */}
        <div className="absolute left-3 top-3 right-3 flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            {product.isPremium && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/95 px-2.5 py-1 text-[10px] font-bold tracking-widest text-amber-950 uppercase shadow-sm">
                <Sparkles className="h-2.5 w-2.5" />
                Premium
              </span>
            )}
            {product.feature && (
              <span className="inline-flex rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-widest text-neutral-700 uppercase backdrop-blur-sm">
                추천
              </span>
            )}
          </div>
          {discountLabel && (
            <span className="rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white shadow-sm">
              {discountLabel}
            </span>
          )}
        </div>

        {/* Bottom info — always visible */}
        <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-10">
          <p className="mb-1 text-[9px] font-semibold tracking-[0.25em] text-white/50 uppercase">
            {subCategoryLabels[product.subCategory as SubCategory] ??
              product.subCategory}
          </p>
          <h3 className="text-sm font-semibold leading-snug text-white line-clamp-2">
            {product.title}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              {hasDiscount && (
                <span className="text-[11px] text-white/35 line-through">
                  {product.price.toLocaleString()}원
                </span>
              )}
              <span className="text-base font-bold text-white">
                {finalPrice === 0
                  ? "무료"
                  : `${finalPrice.toLocaleString()}원`}
              </span>
            </div>
            <span className="text-[11px] text-white/40">
              좋아요 {product.likes?.length || 0}
            </span>
          </div>
        </div>

        {/* Hover CTA — slides up from bottom */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 translate-y-full opacity-0 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/preview/${product._id}?u=${PREVIEW_ID}`);
            }}
            className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20"
          >
            <Eye className="h-3.5 w-3.5" />
            샘플보기
          </button>
        </div>

      </div>
    </article>
  );
}
