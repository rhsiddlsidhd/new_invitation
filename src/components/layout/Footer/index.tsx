import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-border border-t py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
                <Heart className="text-primary-foreground h-4 w-4 fill-current" />
              </div>
              <span className="text-foreground text-lg font-bold">
                WeddingCard
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {"당신의 특별한 날을 더 아름답게 만드는 모바일 청첩장 서비스"}
            </p>
          </div>

          <div>
            <h3 className="text-foreground mb-3 font-bold">{"서비스"}</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {"템플릿"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {"가격"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {"사용 가이드"}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground mb-3 font-bold">{"회사"}</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {"소개"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {"블로그"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {"채용"}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground mb-3 font-bold">{"지원"}</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {"고객센터"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {"FAQ"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {"문의하기"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border text-muted-foreground border-t pt-8 text-center text-sm">
          <p>{"© 2025 WeddingCard. All rights reserved."}</p>
        </div>
      </div>
    </footer>
  );
}
