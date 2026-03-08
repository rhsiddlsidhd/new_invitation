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
import { UserIcon, LogOut } from "lucide-react";
import { AuthSession } from "@/types/auth";
import { USER_NAV_ITEMS } from "@/constants/navigation";

interface UserAccountNavProps {
  session: AuthSession;
}

const UserAccountNav = ({ session }: UserAccountNavProps) => {
  const { handleSignOut } = useSignOut();
  const setToken = useAuthStore((state) => state.setToken);
  const role = useAuthStore((state) => state.role);

  // 서버에서 받은 세션을 store에 동기화
  useEffect(() => {
    setToken(session);
  }, [session, setToken]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {USER_NAV_ITEMS
          .filter((item) => (item.adminOnly ? role === "ADMIN" : true))
          .map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href} className="flex w-full items-center">
                <item.icon className="mr-2 size-4" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-destructive focus:text-destructive flex w-full items-center"
        >
          <LogOut className="mr-2 size-4" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
