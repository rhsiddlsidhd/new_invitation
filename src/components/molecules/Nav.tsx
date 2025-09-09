"use client";
import React from "react";
import { SignOutIcon, UserIcon } from "../atoms/Icon";
import { signOut } from "@/actions/auth";
import { useModalStore } from "@/store/modalStore";

const Nav = ({
  user,
  className,
}: {
  user: string | null;
  className?: string;
}) => {
  const { setModalOpen } = useModalStore();

  return (
    <div className={`bg-translate p-2 ${className}`}>
      {user ? (
        <SignOutIcon size={24} onClick={signOut} />
      ) : (
        <UserIcon
          size={24}
          onClick={() => setModalOpen({ isOpen: true, type: "login" })}
        />
      )}

      {/* <HamburgerIcon size={32} onClick={() => console.log("햄버거")} /> */}
    </div>
  );
};

export default Nav;
