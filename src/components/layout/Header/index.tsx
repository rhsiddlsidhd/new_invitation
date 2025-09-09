import Logo from "@/components/atoms/Logo";
import Nav from "@/components/molecules/Nav";
import { decrypt, getSession } from "@/lib/session";
import React from "react";

const Header = async () => {
  let user = null;
  try {
    const token = await getSession();
    const payload = await decrypt(token);
    user = payload.userId;
  } catch {
    user = null;
  }

  return (
    <div className="bg-trasparent fixed bottom-0 z-50 w-full px-2 backdrop-blur-md max-sm:sticky max-sm:top-0">
      <div className="relative flex h-full w-full items-center justify-between">
        <Logo />
        <div className="max-sm:relative sm:absolute sm:left-1/2 sm:-translate-x-1/2">
          <Nav user={user} />
        </div>
        <h1 className="max-sm:hidden">create by 2025</h1>
      </div>
    </div>
  );
};

export default Header;
