import { Particle } from "@/shared/types";
import { stagger } from "motion/react";

export const particleContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.1),
    },
  },
};

export const particleItem = {
  hidden: (particle: Particle) => ({
    left: `${particle.x}%`,
    top: `${particle.y}%`,
    transform: `translate3d(-50%, -50%, ${particle.z}px)`,
    scale: 0.8,
    opacity: 0,
  }),
  show: (particle: Particle) => ({
    left: `${particle.x}%`,
    top: `${particle.y}%`,
    transform: `translate3d(calc(-50% + ${particle.moveX}%), calc(-50% + ${particle.moveY}%), ${particle.z}px)`,
    opacity: 1,
    scale: 1,
  }),
};

export const lineOverlayContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      delayChildren: stagger(0.3, { from: "first" }),
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      delayChildren: stagger(0.1, { from: "last" }),
    },
  },
};

export const lineOverlay = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: { scale: 0, transition: { duration: 0.1 } },
};

export const lineOverlayItem = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { duration: 0.6 } },
  exit: { scale: 0, transition: { duration: 0.1 } },
};

export const navigationContainer = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delayChildren: stagger(0.3, { from: "first" }),
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      delayChildren: stagger(0.1, { from: "last" }),
    },
    y: "100%",
  },
};

export const navigationItem = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    x: 20,
  },
  visible: ({ textView }: { textView: "hide" | "show" | "pending" }) => {
    switch (textView) {
      case "show":
        return {
          opacity: 1,
          scale: 0.9,
          x: 0,
          transition: { duration: 0.3 },
        };
      case "pending":
        return {
          opacity: 0,
          scale: 0.9,
          x: "100%",
          filter: "brightness(0.8)",
          transition: { duration: 0.3 },
          pointerEvents: "none",
        };
      default:
        return {};
    }
  },

  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.1 },
  },
};
