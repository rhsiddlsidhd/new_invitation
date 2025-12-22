"use client";

import Spinner from "@/components/atoms/Spinner/Spinner";
import useAuth from "@/hooks/useAuth";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { signOut } from "@/actions/signOut";
import useAuthTokenStore from "@/store/authTokenStore";
import { fetcher } from "@/api/fetcher";
import { handleClientError } from "@/api/error";
import { UserIcon } from "@/components/atoms/Icon";
import { Btn } from "@/components/atoms/Btn/Btn";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/atoms/NavigationMenu/NavigationMenu";

const AuthButton = () => {
  const router = useRouter();
  const { isAuth, loading } = useAuth();

  const clearAuth = useAuthTokenStore((state) => state.clearAuth);
  const userRole = useAuthTokenStore((state) => state.role);
  const handlesignOut = async () => {
    await signOut();
    clearAuth();
  };

  const handleSignin = async () => {
    try {
      const path = "/login";

      const data = await fetcher<{ path: string }>(
        `/api/auth/entry?next=${encodeURIComponent(path)}`,
        {
          method: "POST",
        },
      );

      router.push(data.path);
    } catch (e) {
      handleClientError(e);
    }
  };

  return (
    <>
      {!isAuth ? (
        <Btn variant="ghost" size="sm">
          <Link onClick={() => handleSignin()} href="#">
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
                      <Link href="#">관리자 페이지</Link>
                    </NavigationMenuLink>
                  )}
                  <NavigationMenuLink asChild>
                    <Link href="#">마이 페이지</Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild onClick={() => handlesignOut()}>
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
