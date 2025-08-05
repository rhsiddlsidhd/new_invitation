"use client";
import React from "react";
import { HamburgerIcon, SignOutIcon, UserIcon } from "../atoms/Icon";
import { singOut } from "@/actions/auth";
import { useRouter } from "next/navigation";

const Nav = ({ user }: { user: string | null }) => {
  const router = useRouter();
  return (
    <div className="flex border-2 border-black bg-white p-2">
      {user ? (
        <SignOutIcon size={32} onClick={singOut} />
      ) : (
        <UserIcon size={32} onClick={() => router.push("/auth/login")} />
      )}

      <HamburgerIcon size={32} onClick={() => console.log("햄버거")} />
    </div>
  );
};

export default Nav;
