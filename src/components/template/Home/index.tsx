"use client";

import { MotionValue, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import HeroSection from "@/components/organisms/section/HeroSection/index";
import NavigationSection from "@/components/organisms/section/NavigationSection/index";
import RecommendedSection from "@/components/organisms/section/RecommendedSection";
import Footer from "@/components/layout/Footer";

interface Sections {
  component: React.FC<{
    offsetStart: number;
    offsetEnd: number;
    scrollY: MotionValue<number>;
    height: number;
  }>;
  height: number;
  offsetStart: number;
  offsetEnd: number;
}

const sections = [
  { component: HeroSection, height: 150 },
  { component: NavigationSection, height: 200 },
  { component: RecommendedSection, height: 200 },
  { component: Footer, height: 100 },
];

export default function Home() {
  const [sectionsPx, setSectionsPx] = useState<Sections[]>([]);
  const { scrollY } = useScroll();

  useEffect(() => {
    const pxHeight = (vh: number) => window.innerHeight * (vh / 100);

    const calculateSections = () => {
      let cumulative = 0;
      const calculated: Sections[] = sections.map(({ component, height }) => {
        const start = cumulative;
        const end = cumulative + pxHeight(height);
        cumulative = end;
        return {
          component,
          height,
          offsetStart: start,
          offsetEnd: end,
        };
      });
      setSectionsPx(calculated);
    };

    calculateSections();
    window.addEventListener("resize", calculateSections);
    return () => {
      window.removeEventListener("resize", calculateSections);
    };
  }, []);

  return (
    <div>
      {sectionsPx.map(
        ({ component: Component, height, offsetStart, offsetEnd }, index) => (
          <Component
            key={index}
            height={height}
            offsetStart={offsetStart}
            offsetEnd={offsetEnd}
            scrollY={scrollY}
          />
        ),
      )}
    </div>
  );
}
