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
    <div className="bg-trasparent fixed bottom-5 z-50 w-full p-4 backdrop-blur-md">
      <div className="relative flex items-center justify-between">
        <Logo />
        <div className="absolute left-1/2 -translate-x-1/2 transform">
          <Nav user={user} />
        </div>
        <h1>create by 2025</h1>
      </div>
    </div>
  );
};

export default Header;
