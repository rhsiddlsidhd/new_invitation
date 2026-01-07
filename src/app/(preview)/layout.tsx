import GuestBookSection from "@/components/organisms/(preview)/GuestBookSection";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  // theme, 공통 Style 정의

  return (
    <div className="bg-background border-muted-foreground-foreground mx-auto min-h-screen max-w-lg border-2">
      {children}
      <GuestBookSection />
    </div>
  );
};

export default layout;
