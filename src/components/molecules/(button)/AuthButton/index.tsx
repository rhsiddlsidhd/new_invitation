"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import useAuthStore from "@/store/auth.store";

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
import { AuthData } from "@/services/auth.service";

interface AuthButtonProps {
  authData: AuthData;
}

const AuthButton = ({ authData }: AuthButtonProps) => {
  const { handleSignOut } = useSignOut();
  const { handleSignIn } = useSignIn();
  const setToken = useAuthStore((state) => state.setToken);

  // 서버에서 받은 인증 정보를 store에 저장
  useEffect(() => {
    if (authData) {
      setToken({
        token: authData.accessToken,
        role: authData.role,
        userId: authData.userId,
      });
    }
  }, [authData, setToken]);

  const isAuth = !!authData;
  const userRole = authData.role;

  return (
    <>
      {!isAuth ? (
        <Btn variant="ghost" size="sm" onClick={handleSignIn}>
          로그인
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
