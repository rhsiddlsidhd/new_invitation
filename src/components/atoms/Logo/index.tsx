import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={`w-fit p-2 text-2xl font-bold ${className}`}>
      NEWINVITATION
    </Link>
  );
};

export default Logo;
