import React from "react";
import { Heart, Gift, Star, Palette, MessageSquare } from "lucide-react";
import Link from "next/link";
import categoryData from "@/data/categories.json";

const ICON_MAP: Record<string, React.ElementType> = {
  Heart,
  Gift,
  Star,
  Palette,
  MessageSquare,
};

export const CategoryNav = () => {
  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {categoryData.map((category) => {
            const Icon = ICON_MAP[category.iconName] || Heart;
            return (
              <Link
                key={category.id}
                href={category.href}
                className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.color} transition-shadow group-hover:shadow-md md:h-20 md:w-20`}
                >
                  <Icon className="h-8 w-8 md:h-10 md:w-10" />
                </div>
                <span className="text-foreground text-sm font-medium md:text-base">
                  {category.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
