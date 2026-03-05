import Header from "@/components/layout/Header";
import React from "react";
import { Toaster } from "sonner";
import { AnnouncementBar } from "@/components/molecules/AnnouncementBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AnnouncementBar />
      <Header />
      {children}
      <Toaster />
    </div>
  );
};

export default layout;
