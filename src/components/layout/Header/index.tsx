import { Btn } from "@/components/atoms/Btn/Btn";
import AuthButton from "@/components/molecules/authButton";

import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = async () => {
  return (
    <header className="bg-background/80 border-border fixed top-0 right-0 left-0 z-50 w-screen border-b backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
            <Heart className="text-primary-foreground h-4 w-4 fill-current" />
          </div>
          <span className="text-foreground text-xl font-bold">WeddingCard</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            특징
          </Link>
          <Link
            href="#templates"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            템플릿
          </Link>
          <Link
            href="#pricing"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            가격
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <AuthButton />

          <Btn
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hidden sm:inline-flex"
          >
            무료로 시작하기
          </Btn>
        </div>
      </div>
    </header>
  );
};

export default Header;
