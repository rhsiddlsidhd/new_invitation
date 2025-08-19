import React from "react";

const Box = ({ children }: { children: React.ReactNode }) => {
  const config = {};

  return (
    <div className="rounded-lg border-1 border-[#ddd] bg-white p-5">
      {children}
    </div>
  );
};

export default Box;
