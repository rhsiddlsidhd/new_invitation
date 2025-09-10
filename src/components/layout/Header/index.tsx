import Logo from "@/components/atoms/Logo";
import AuthToggleBtn from "@/components/molecules/btns/AuthToggleBtn";
import React from "react";

const Header = async () => {
  return (
    <div className="bg-trasparent fixed bottom-0 z-50 w-full px-2 backdrop-blur-md max-sm:sticky max-sm:top-0">
      <div className="relative flex h-full w-full items-center justify-between">
        <Logo />
        <div className="max-sm:relative sm:absolute sm:left-1/2 sm:-translate-x-1/2">
          <AuthToggleBtn />
        </div>
        <h1 className="max-sm:hidden">create by 2025</h1>
      </div>
    </div>
  );
};

export default Header;
