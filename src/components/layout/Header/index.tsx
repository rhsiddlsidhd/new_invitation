import AuthButton from "@/components/molecules/(button)/AuthButton";
import { getAuth } from "@/services/auth.service";
import { Heart, Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { mainNavItems } from "@/constants/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/sheet";
import { Button } from "@/components/atoms/button";

const Header = async () => {
  const authData = await getAuth();

  return (
    <header className="bg-background/80 border-border sticky top-0 right-0 left-0 z-50 w-full border-b backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
                    <Heart className="text-primary-foreground h-4 w-4 fill-current" />
                  </div>
                  <span className="text-foreground text-xl font-bold">
                    WeddingCard
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary border-border border-b py-2 text-lg font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
            <Heart className="text-primary-foreground h-4 w-4 fill-current" />
          </div>
          <span className="text-foreground text-xl font-bold max-sm:hidden">
            WeddingCard
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth / Action Buttons */}
        <div className="flex items-center gap-2">
          <AuthButton authData={authData} />
        </div>
      </div>
    </header>
  );
};

export default Header;
