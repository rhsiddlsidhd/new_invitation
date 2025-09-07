"use client";
import ScrollViewBox from "@/components/template/Box/ScrollVIewBox";
import CreateContainer from "@/components/template/CreateContainer";

import PreviewContainer from "@/components/template/PreviewContainer";
import { MotionValue, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer/index";
import IntroContainer from "@/components/template/IntroContainer";

interface Sections {
  component: React.FC<{
    offsetStart: number;
    offsetEnd: number;
    scrollY: MotionValue<number>;
  }>;
  height: number;
  offsetStart: number;
  offsetEnd: number;
  zIndex?: number;
}

const sections = [
  { component: IntroContainer, height: 150 },
  { component: CreateContainer, height: 200 },
  { component: PreviewContainer, height: 200, zIndex: 20 },
  { component: Footer, height: 100 },
];

export default function Home() {
  const [sectionsPx, setSectionsPx] = useState<Sections[]>([]);
  const { scrollY } = useScroll();

  useEffect(() => {
    const pxHeight = (vh: number) => window.innerHeight * (vh / 100);

    let cumulative = 0;
    const calculated: Sections[] = sections.map(
      ({ component, height, zIndex }) => {
        const start = cumulative;
        const end = cumulative + pxHeight(height);
        cumulative = end;
        return {
          component,
          height,
          zIndex,
          offsetStart: start,
          offsetEnd: end,
        };
      },
    );

    setSectionsPx(calculated);
  }, []);

  return (
    <div>
      {sectionsPx.map(
        (
          { component: Component, height, zIndex, offsetStart, offsetEnd },
          index,
        ) => (
          <ScrollViewBox key={index} height={height} zIndex={zIndex}>
            <Component
              offsetStart={offsetStart}
              offsetEnd={offsetEnd}
              scrollY={scrollY}
            />
          </ScrollViewBox>
        ),
      )}
    </div>
  );
}
