import { Btn } from "@/components/atoms/Btn/Btn";
import { Card, CardContent } from "@/components/atoms/Card/Card";
import { Eye } from "lucide-react";
import Link from "next/link";

const templates = [
  {
    name: "클래식 화이트",
    description: "깔끔하고 우아한 전통적인 스타일",
    color: "from-slate-50 to-slate-100",
  },
  {
    name: "로맨틱 핑크",
    description: "사랑스럽고 따뜻한 분위기",
    color: "from-rose-50 to-pink-100",
  },
  {
    name: "모던 미니멀",
    description: "심플하고 세련된 현대적 감각",
    color: "from-zinc-50 to-stone-100",
  },
  {
    name: "빈티지 크림",
    description: "고풍스럽고 따뜻한 느낌",
    color: "from-amber-50 to-orange-50",
  },
];

export function Templates() {
  return (
    <section id="templates" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-4xl font-bold text-balance md:text-5xl">
            {"다양한 템플릿"}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {"당신의 스타일을 완벽하게 표현할 수 있는 프리미엄 템플릿"}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {templates.map((template, index) => (
            <Card
              key={index}
              className="border-border bg-card group overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div
                className={`h-48 bg-gradient-to-br ${template.color} relative flex items-center justify-center overflow-hidden`}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                  <Btn
                    variant="secondary"
                    size="sm"
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {"미리보기"}
                  </Btn>
                </div>
                <div className="h-40 w-32 rounded-lg bg-white/60 shadow-lg backdrop-blur-sm" />
              </div>
              <CardContent className="p-4">
                <h3 className="text-card-foreground mb-1 text-lg font-bold">
                  {template.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {template.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Btn
            asChild
            variant="outline"
            size="lg"
            className="border-border bg-transparent"
          >
            <Link href="/templates">{"더 많은 템플릿 보기"}</Link>
          </Btn>
        </div>
      </div>
    </section>
  );
}
