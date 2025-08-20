import React from "react";

const Box = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const config = {};

  return (
    <div
      className={`rounded-lg border-1 border-[#ddd] bg-white p-5 ${className}`}
    >
      {children}
    </div>
  );
};

export default Box;
