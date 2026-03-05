"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight, Sparkles, Image as ImageIcon, MessageSquare, History } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import promotions from "@/data/promotions.json";

// 아이콘 매핑 객체
const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Image: ImageIcon,
  MessageSquare,
  History,
};

export const EcommerceHero = () => {
  const [activePromotion, setActivePromotion] = useState(promotions[0]);
  const [isPaused, setIsPaused] = useState(false);

  // 다음 프로모션으로 자동 전환 로직
  const nextPromotion = useCallback(() => {
    const currentIndex = promotions.findIndex((p) => p.id === activePromotion.id);
    const nextIndex = (currentIndex + 1) % promotions.length;
    setActivePromotion(promotions[nextIndex]);
  }, [activePromotion.id]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(nextPromotion, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextPromotion]);

  return (
    <section 
      className="relative overflow-hidden bg-white pt-20 md:pt-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        {/* Layout: Mobile (Banner Top, Tabs Bottom) / Desktop (Tabs Left, Banner Right) */}
        <div className="flex flex-col-reverse gap-8 py-8 md:flex-row md:items-stretch md:py-12">
          
          {/* Tabs Section (Left on Desktop, Bottom on Mobile) - 비즈니스 프로모션 선택 영역 */}
          <div className="flex w-full flex-col justify-center gap-2 md:w-1/3 lg:w-1/4">
            <div className="hidden md:block mb-6">
              <h2 className="text-2xl font-bold text-slate-900">당신의 특별한 날을 위한<br/>프리미엄 솔루션</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-col md:gap-3">
              {promotions.map((promo) => {
                const isActive = activePromotion.id === promo.id;
                const Icon = ICON_MAP[promo.iconName] || Sparkles;

                return (
                  <button
                    key={promo.id}
                    onClick={() => {
                      setActivePromotion(promo);
                      setIsPaused(true);
                    }}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-2xl p-4 text-left transition-all duration-300",
                      isActive 
                        ? "bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-100" 
                        : "hover:bg-slate-50"
                    )}
                  >
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                      isActive ? promo.bgColor : "bg-slate-100 group-hover:bg-white"
                    )}>
                      <Icon className={cn("h-5 w-5", isActive ? promo.accentColor : "text-slate-400")} />
                    </div>
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-sm font-bold transition-colors",
                        isActive ? "text-slate-900" : "text-slate-500"
                      )}>
                        {promo.label}
                      </span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 z-[-1] rounded-2xl bg-white shadow-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Banner Showcase Area */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePromotion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={cn(
                  "relative flex h-full min-h-[450px] flex-col overflow-hidden rounded-[2.5rem] p-8 md:flex-row md:items-center md:p-12",
                  activePromotion.bgColor
                )}
              >
                {/* Content Side */}
                <div className="relative z-10 flex flex-1 flex-col justify-center text-center md:text-left">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4 inline-flex w-fit self-center md:self-start items-center gap-2 rounded-full bg-white/80 px-4 py-2 backdrop-blur-sm"
                  >
                    <Sparkles className={cn("h-4 w-4", activePromotion.accentColor)} />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
                      {activePromotion.badge}
                    </span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl"
                  >
                    {activePromotion.title.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8 text-base text-slate-600 md:text-lg whitespace-pre-line leading-relaxed"
                  >
                    {activePromotion.description}
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col gap-4 sm:flex-row justify-center md:justify-start"
                  >
                    <Button
                      size="lg"
                      className="group bg-slate-900 px-8 text-white hover:bg-slate-800 rounded-full"
                    >
                      무료로 시작하기
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/50 border-white px-8 text-slate-900 backdrop-blur-sm rounded-full"
                    >
                      기능 더보기
                    </Button>
                  </motion.div>
                </div>

                {/* Image Side */}
                <div className="relative mt-8 flex flex-1 items-center justify-center md:mt-0">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="relative aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-3xl shadow-2xl rotate-3 transition-transform hover:rotate-0"
                  >
                    <Image
                      src={activePromotion.image}
                      alt={activePromotion.label}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                  {/* Decorative blobs based on active promotion color */}
                  <div className={cn("absolute -right-8 -top-8 h-48 w-48 rounded-full blur-3xl opacity-40", activePromotion.accentColor.replace("text", "bg"))} />
                  <div className={cn("absolute -bottom-8 -left-8 h-48 w-48 rounded-full blur-3xl opacity-20", activePromotion.accentColor.replace("text", "bg"))} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
