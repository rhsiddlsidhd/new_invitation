import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="bg-primary text-primary-foreground relative overflow-hidden py-24">
      <div className="from-accent/20 absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="bg-primary-foreground/10 text-primary-foreground mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">
            {"지금 시작하면 프리미엄 템플릿 무료"}
          </span>
        </div>

        <h2 className="mb-6 text-4xl font-bold text-balance md:text-5xl">
          {"당신의 특별한 날,"}
          <br />
          {"지금 바로 준비하세요"}
        </h2>

        <p className="text-primary-foreground/80 mx-auto mb-8 max-w-2xl text-lg leading-relaxed">
          {"5분이면 충분합니다. 신용카드도 필요 없어요."}
          <br />
          {"지금 바로 무료로 시작해보세요."}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90 group"
          >
            {"무료로 시작하기"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            {"상담 문의하기"}
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="bg-accent/20 absolute top-10 left-10 h-24 w-24 animate-pulse rounded-full blur-3xl" />
      <div className="bg-primary-foreground/10 absolute right-10 bottom-10 h-32 w-32 animate-pulse rounded-full blur-3xl [animation-delay:1s]" />
    </section>
  );
}
