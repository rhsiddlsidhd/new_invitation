"use client";
import { useMotionValueEvent, useScroll } from "motion/react";
import React, { useRef, useState } from "react";
import { useTransform } from "framer-motion";
import LineOverlay from "../organisms/LineOverlay";
import ScrollNavigationMenu from "../organisms/ScrollNavigationMenu ";

const CreateContainer = ({ user }: { user: string | null }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isView, setIsView] = useState<boolean>(false);
  const [textView, setTextView] = useState<"hidden" | "show" | "pending">(
    "hidden",
  );

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
    const textState =
      latest > 0.95 ? "pending" : latest > 0.5 ? "show" : "hidden";

    setIsView((prev) => (prev !== viewState ? viewState : prev));
    setTextView((prev) => (prev !== textState ? textState : prev));
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
