"use client";
import { useMotionValueEvent, useScroll } from "motion/react";
import React, { useRef, useState } from "react";
import { useTransform } from "framer-motion";
import LineOverlay from "../organisms/LineOverlay";
import ScrollNavigationMenu from "../organisms/ScrollNavigationMenu ";

const CreateContainer = ({ user }: { user: string | null }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isView, setIsView] = useState<boolean>(false);
  const [textView, setTextView] = useState<"hide" | "show" | "pending">("hide");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const { scrollYProgress: hideScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const viewState = latest > 0.3 && latest < 0.95;

    setIsView((prev) => (prev !== viewState ? viewState : prev));

    if (latest > 0.95) {
      setTextView("pending");
    } else if (latest > 0.5) {
      setTextView("show");
    } else {
      setTextView("hide");
    }
  });

  const y = useTransform(hideScrollYProgress, [0, 1], ["0%", "-300%"]);

  return (
    <div
      className="relative z-20 h-[150vh] w-full overflow-hidden"
      ref={containerRef}
    >
      <LineOverlay isView={isView} />
      <ScrollNavigationMenu textView={textView} y={y} user={user} />
    </div>
  );
};

export default CreateContainer;
