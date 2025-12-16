"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart, Heart, Share2 } from "lucide-react";
import { useState } from "react";

interface TemplateDetailProps {
  template: {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    category: string;
    featured: boolean;
    description: string;
  };
}

export function TemplateDetail({ template }: TemplateDetailProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="mb-16">
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left side - Thumbnail */}
        <div className="sticky top-24">
          <div className="bg-muted border-border relative aspect-[3/4] overflow-hidden rounded-2xl border shadow-lg">
            <Image
              src={template.thumbnail || "/placeholder.svg"}
              alt={template.name}
              fill
              className="object-cover"
            />
            {template.featured && (
              <Badge className="bg-accent text-accent-foreground absolute top-4 right-4">
                인기
              </Badge>
            )}
          </div>
        </div>

        {/* Right side - Product Info */}
        <div className="space-y-6">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="outline">{template.category}</Badge>
            </div>
            <h1 className="text-foreground mb-3 text-4xl font-bold text-balance">
              {template.name}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed text-balance">
              {template.description}
            </p>
          </div>

          {/* Price */}
          <div className="border-border border-y py-6">
            <div className="flex items-baseline gap-2">
              <span className="text-primary text-4xl font-bold">
                {template.price.toLocaleString()}원
              </span>
              <span className="text-muted-foreground">/ 1회 구매</span>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              부가세 포함 가격
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href={`/templates/${template.id}/preview`} className="block">
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-transparent"
              >
                <Eye className="mr-2 h-5 w-5" />
                미리보기
              </Button>
            </Link>
            <Link
              href={`/checkout?templateId=${template.id}`}
              className="block"
            >
              <Button size="lg" className="w-full">
                <ShoppingCart className="mr-2 h-5 w-5" />
                구매하기
              </Button>
            </Link>
          </div>

          {/* Secondary Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                className={`mr-2 h-4 w-4 ${isLiked ? "fill-current text-red-500" : ""}`}
              />
              좋아요
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
            >
              <Share2 className="mr-2 h-4 w-4" />
              공유하기
            </Button>
          </div>

          {/* Additional Info */}
          <div className="bg-muted space-y-3 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="bg-primary mt-2 h-2 w-2 shrink-0 rounded-full" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                구매 후 즉시 사용 가능하며, 무제한으로 수정할 수 있습니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary mt-2 h-2 w-2 shrink-0 rounded-full" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                평생 호스팅이 포함되어 있어 별도의 유지비가 없습니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary mt-2 h-2 w-2 shrink-0 rounded-full" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                모바일과 데스크톱 모두에서 완벽하게 작동합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
