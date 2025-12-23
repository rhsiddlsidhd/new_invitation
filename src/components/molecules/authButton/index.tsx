"use client";

import Spinner from "@/components/atoms/Spinner/Spinner";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React from "react";
import useAuthTokenStore from "@/store/authTokenStore";
import { UserIcon } from "@/components/atoms/Icon";
import { Btn } from "@/components/atoms/Btn/Btn";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/atoms/NavigationMenu/NavigationMenu";
import { useSignOut } from "@/hooks/useSignOut";
import { useSignIn } from "@/hooks/useSignIn";

const AuthButton = () => {
  const { isAuth, loading } = useAuth();
  const { handleSignOut } = useSignOut();
  const { handleSignIn } = useSignIn();
  const userRole = useAuthTokenStore((state) => state.role);

  return (
    <>
      {!isAuth ? (
        <Btn variant="ghost" size="sm">
          <Link onClick={handleSignIn} href="#">
            {loading ? <Spinner /> : "로그인"}
          </Link>
        </Btn>
      ) : (
        <NavigationMenu>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>
              <UserIcon size={18} />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-50 gap-4">
                <li>
                  {userRole === "ADMIN" && (
                    <NavigationMenuLink asChild>
                      <Link href="/admin/dashboard">관리자 페이지</Link>
                    </NavigationMenuLink>
                  )}
                  <NavigationMenuLink asChild>
                    <Link href="#">마이 페이지</Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild onClick={handleSignOut}>
                    <Link href="#">로그아웃</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu>
      )}
    </>
  );
};

export default AuthButton;
