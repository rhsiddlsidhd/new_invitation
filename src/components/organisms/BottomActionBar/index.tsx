import { Btn } from "@/components/atoms/Btn/Btn";
import { Separator } from "@/components/atoms/Separator";
import clsx from "clsx";
import { Save } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const BottomActionBar = () => {
  const [isFormEndVisible, setIsFormEndVisible] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!bottomRef.current) return;
    const options = {
      threshold: 1.0,
    };
    const io = new IntersectionObserver(([entry]) => {
      setIsFormEndVisible(entry.isIntersecting);
    }, options);

    io.observe(bottomRef.current);
    return () => {
      io.disconnect();
    };
  }, []);
  return (
    <div>
      <Separator
        className="pointer-events-none m-0 h-px opacity-0"
        ref={bottomRef}
      />
      <div
        className={clsx(
          `bg-background/80 border-border fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur-sm`,
          `transition-all duration-500 ease-out`,
          isFormEndVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0",
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="mx-auto flex max-w-5xl gap-4">
            <Btn type="submit" size="lg" className="flex-1 cursor-pointer">
              <Save className="mr-2 h-5 w-5" />
              저장하기
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomActionBar;
