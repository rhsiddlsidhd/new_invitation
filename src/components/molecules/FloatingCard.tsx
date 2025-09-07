"use client";
import React, { useEffect, useState } from "react";
import { motion, stagger, MotionStyle } from "framer-motion";
import { Post } from "@/types";
import { squareSizes } from "@/contants";
import Card from "../atoms/Card";
import Img from "../atoms/Img";

const FloatingCard = ({
  callback,
  style,
}: {
  callback: () => void;
  style?: React.CSSProperties | MotionStyle;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const data = Array.from({ length: 16 }, () => {
      // {x,y,z,delay,moveX,moveY}[]
      let x, y;
      const zone = Math.floor(Math.random() * 4);
      switch (zone) {
        case 0: // 왼쪽영역
          x = Math.random() * 25 + 5; // 5% ~ 30%
          y = Math.random() * 80 + 10; // 10% ~ 90%
          break;
        case 1: // 오른쪽영역
          x = Math.random() * 25 + 70; // 70% ~ 95%
          y = Math.random() * 80 + 10; // 10%
          break;
        case 2: // 위쪽영역
          x = Math.random() * 60 + 20; // 20% ~ 80%
          y = Math.random() * 20 + 5; // 5%
          break;
        case 3: // 아래쪽영역
          x = Math.random() * 60 + 20; // 20% ~ 80%
          y = Math.random() * 20 + 75; // 75% ~ 95%
          break;
        default:
          x = 10;
          y = 10;
      }

      return {
        size: Math.floor(Math.random() * 14),
        x,
        y,
        z: Math.random() * 300 - 150,
        moveX: (Math.random() - 0.5) * 20,
        moveY: (Math.random() - 0.5) * 20,
      };
    });

    setPosts(data);
  }, []);

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.1),
      },
    },
  };

  const item = {
    hidden: (post: Post) => ({
      left: `${post.x}%`,
      top: `${post.y}%`,
      transform: `translate3d(-50%, -50%, ${post.z}px)`,
      scale: 0.8,
      opacity: 0,
    }),
    show: (post: Post) => ({
      left: `${post.x}%`,
      top: `${post.y}%`,
      transform: `translate3d(calc(-50% + ${post.moveX}%), calc(-50% + ${post.moveY}%), ${post.z}px)`,
      opacity: 1,
      scale: 1,
    }),
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="absolute top-0 left-0 h-full w-full perspective-distant transform-3d"
      style={{ ...style }}
    >
      {posts.map((post, i) => {
        return (
          <Card
            key={i}
            custom={post}
            variants={item}
            className={`${squareSizes[post.size]} absolute -z-10`}
            onAnimationComplete={() => {
              if (i === posts.length - 1) callback();
            }}
          >
            <Img src="/marriage.jpg" />
          </Card>
        );
      })}
    </motion.div>
  );
};

export default FloatingCard;
