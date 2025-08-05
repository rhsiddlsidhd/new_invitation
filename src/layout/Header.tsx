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
    <div className="bg-trasparent fixed top-0 flex w-full items-center justify-between p-4 backdrop-blur-md">
      <Logo />
      <Nav user={user} />
    </div>
  );
};

export default Header;
