"use client";
import React from "react";
import { HamburgerIcon, SignOutIcon, UserIcon } from "../atoms/Icon";
import { singOut } from "@/actions/auth";
import useAuthStore from "@/store/authStore";

const Nav = ({
  user,
  className,
}: {
  user: string | null;
  className?: string;
}) => {
  const { setModalOpen } = useAuthStore();

  return (
    <div className={`bg-translate flex gap-2 p-4 ${className}`}>
      {user ? (
        <SignOutIcon size={32} onClick={singOut} />
      ) : (
        <UserIcon size={32} onClick={() => setModalOpen(true, "login")} />
      )}

      <HamburgerIcon size={32} onClick={() => console.log("햄버거")} />
    </div>
  );
};

export default Nav;
