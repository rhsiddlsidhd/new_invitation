import React, { CSSProperties } from "react";

const Box = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`rounded-lg border-1 border-[#ddd] bg-white p-5 ${className}`}
    >
      {children}
    </div>
  );
};

export default Box;
