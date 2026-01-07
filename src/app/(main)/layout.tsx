import Header from "@/components/layout/Header";
import React from "react";
import { Toaster } from "sonner";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Toaster />
    </div>
  );
};

export default layout;
