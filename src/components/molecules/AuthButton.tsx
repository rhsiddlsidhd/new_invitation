"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import useAuthStore from "@/store/auth.store";

import { Button } from "@/components/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { useSignOut } from "@/hooks/useSignOut";
import { useSignIn } from "@/hooks/useSignIn";
import {
  UserIcon,
  LayoutDashboard,
  User,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { AuthData } from "@/services/auth.service";

interface AuthButtonProps {
  authData: AuthData;
}

const AuthButton = ({ authData }: AuthButtonProps) => {
  const { handleSignOut } = useSignOut();
  const { handleSignIn } = useSignIn();
  const setToken = useAuthStore((state) => state.setToken);
  const role = useAuthStore((state) => state.role);

  // 서버에서 받은 인증 정보를 store에 저장
  useEffect(() => {
    if (authData) {
      setToken({
        token: authData.token,
        role: authData.role,
        userId: authData.userId,
      });
    }
  }, [authData, setToken]);

  const isAuth = !!authData;

  return (
    <>
      {!isAuth ? (
        <Button variant="ghost" size="sm" onClick={handleSignIn}>
          로그인
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <UserIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {role === "ADMIN" && (
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
