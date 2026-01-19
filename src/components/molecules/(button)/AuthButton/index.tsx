"use client";

import Spinner from "@/components/atoms/Spinner/Spinner";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React from "react";
import useAuthTokenStore from "@/store/authTokenStore";

import { Btn } from "@/components/atoms/Btn/Btn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/DropdownMenu/DropdownMenu";
import { useSignOut } from "@/hooks/useSignOut";
import { useSignIn } from "@/hooks/useSignIn";
import {
  UserIcon,
  LayoutDashboard,
  User,
  ShoppingBag,
  LogOut,
} from "lucide-react";

const AuthButton = () => {
  const { isAuth, loading } = useAuth();
  const { handleSignOut } = useSignOut();
  const { handleSignIn } = useSignIn();
  const userRole = useAuthTokenStore((state) => state.role);

  return (
    <>
      {!isAuth ? (
        <Btn variant="ghost" size="sm" onClick={handleSignIn}>
          {loading ? <p className="text-black/50">로그인</p> : "로그인"}
        </Btn>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Btn variant="ghost" size="icon">
              <UserIcon className="size-4" />
            </Btn>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {userRole === "ADMIN" && (
              <DropdownMenuItem asChild>
                <Link href="/admin/dashboard">
                  <LayoutDashboard />
                  관리자 페이지
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User />
                마이 프로필
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/order">
                <ShoppingBag />
                마이 주문
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} variant="destructive">
              <LogOut />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default AuthButton;
