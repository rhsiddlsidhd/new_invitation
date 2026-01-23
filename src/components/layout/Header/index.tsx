import AuthButton from "@/components/molecules/(button)/AuthButton";
import { getAuth } from "@/services/auth.service";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const authData = await getAuth();

  return (
    <header className="bg-background/80 border-border fixed top-0 right-0 left-0 z-50 w-screen border-b backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
            <Heart className="text-primary-foreground h-4 w-4 fill-current" />
          </div>
          <span className="text-foreground text-xl font-bold">WeddingCard</span>
        </Link>

        <div className="flex items-center gap-2">
          <AuthButton authData={authData} />
        </div>
      </div>
    </header>
  );
};

export default Header;
