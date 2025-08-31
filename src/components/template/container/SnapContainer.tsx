"use client";
import { useMotionValueEvent, useScroll } from "motion/react";
import React, { useRef } from "react";

const SnapContainer = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default SnapContainer;
