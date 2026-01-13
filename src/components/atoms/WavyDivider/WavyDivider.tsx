import { cn } from "@/lib/utils";
import React from "react";

export function WavyDivider({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative w-full overflow-hidden leading-none", className)}
      {...props}
    >
      {/* Layer 1 */}
      <svg
        viewBox="0 0 1000 50"
        preserveAspectRatio="none"
        className="absolute bottom-0 h-full w-[200%] animate-wave-3"
      >
        <path
          d="M0,15 C100,-10 350,60 500,20 L500,50 L0,50 Z"
          className="fill-white/10"
        ></path>
        <path
          d="M500,20 C600,0 850,30 1000,10 L1000,50 L500,50 Z"
          className="fill-white/10"
        ></path>
      </svg>

      {/* Layer 2 */}
      <svg
        viewBox="0 0 1000 50"
        preserveAspectRatio="none"
        className="absolute bottom-0 h-full w-[200%] animate-wave-2"
      >
        <path
          d="M0,30 C200,55 300,5 500,20 L500,50 L0,50 Z"
          className="fill-white/30"
        ></path>
        <path
          d="M500,20 C700,35 800,-5 1000,30 L1000,50 L500,50 Z"
          className="fill-white/30"
        ></path>
      </svg>

      {/* Layer 3 (Top-most) */}
      <svg
        viewBox="0 0 1000 50"
        preserveAspectRatio="none"
        className="absolute bottom-0 h-full w-[200%] animate-wave"
      >
        <path
          d="M0,25 C150,50 350,0 500,25 L500,50 L0,50 Z"
          className="fill-white/50"
        ></path>
        <path
          d="M500,25 C650,50 850,0 1000,25 L1000,50 L500,50 Z"
          className="fill-white/50"
        ></path>
      </svg>
    </div>
  );
}
