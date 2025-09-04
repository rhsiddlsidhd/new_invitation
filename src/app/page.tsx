"use client";
import Footer from "@/components/layout/Footer";
import ScrollViewBox from "@/components/template/Box/ScrollVIewBox";
import CreateContainer from "@/components/template/CreateContainer";
import IntroContainer from "@/components/template/IntroContainer";
import PreviewContainer from "@/components/template/PreviewContainer";
import { decrypt, getSession } from "@/lib/session";
import { useScroll } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const sections = [
  { component: IntroContainer, height: 150 },
  { component: CreateContainer, height: 200 },
  { component: PreviewContainer, height: 200, zIndex: 20 },
  { component: Footer, height: 100 },
];

export default function Home() {
  const [sectionsPx, setSectionsPx] = useState<Record<string, any>[]>([]);
  const { scrollY } = useScroll();

  useEffect(() => {
    const pxHeight = (vh: number) => window.innerHeight * (vh / 100);

    let cumulative = 0;
    const calculated = sections.map(({ component, height, zIndex }) => {
      const start = cumulative;
      const end = cumulative + pxHeight(height);
      cumulative = end;
      return { component, height, zIndex, offsetStart: start, offsetEnd: end };
    });

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
