import AuthButton from "@/components/molecules/authButton";
import { Button } from "@/components/ui/button";
import React from "react";

const Header = () => {
  return (
    <header className="bg-background/80 border-border fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
            {/* <Heart className="w-4 h-4 text-primary-foreground fill-current" /> */}
          </div>
          <span className="text-foreground text-xl font-bold">WeddingCard</span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            특징
          </a>
          <a
            href="#templates"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            템플릿
          </a>
          <a
            href="#pricing"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            가격
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            <AuthButton />
          </Button>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            무료로 시작하기
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
