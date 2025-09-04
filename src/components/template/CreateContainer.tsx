"use client";

import { useMotionValueEvent } from "motion/react";
import React, { useRef, useState } from "react";
import { MotionValue, useTransform } from "framer-motion";
import LineOverlay from "../organisms/LineOverlay";
import ScrollNavigationMenu from "../organisms/ScrollNavigationMenu ";

const CreateContainer = ({
  offsetStart,
  offsetEnd,
  scrollY,
}: {
  offsetStart: number;
  offsetEnd: number;
  scrollY: MotionValue<number>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isView, setIsView] = useState<boolean>(false);
  const [textView, setTextView] = useState<"hidden" | "show" | "pending">(
    "hidden",
  );

  const y = useTransform(scrollY, [offsetStart, offsetEnd], [0, 1]);

  useMotionValueEvent(y, "change", (latest) => {
    console.log("la", latest);
    const viewState = latest > 0.1 && latest < 0.5;
    const textState =
      latest >= 0.5 ? "pending" : latest > 0.2 ? "show" : "hidden";

    setIsView((prev) => (prev !== viewState ? viewState : prev));
    setTextView((prev) => (prev !== textState ? textState : prev));
  });

  return (
    <div
      style={{ height: "100%" }}
      className="relative z-10"
      ref={containerRef}
    >
      <LineOverlay isView={isView} />
      <ScrollNavigationMenu textView={textView} />
    </div>
  );
};

export default CreateContainer;
