"use client";
import React from "react";
import { motion, stagger, MotionStyle } from "framer-motion";
import { Post } from "@/types";
import { squareSizes } from "@/contants";
import Card from "../atoms/Card";
import Img from "../atoms/Img";

const PostBoard = ({
  posts,
  callback,
  style,
}: {
  posts: Post[];
  callback: () => void;
  style?: React.CSSProperties | MotionStyle;
}) => {
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
      transform: `translate3d(-50%, -50%, ${post.z}px)`,
      scale: 0.8,
      opacity: 0,
    }),
    show: (post: Post) => ({
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
      className="perspective-distant transform-3d absolute left-0 top-0 h-full w-full"
      style={{ ...style }}
    >
      {posts.map((post, i) => {
        return (
          <Card
            key={i}
            post={post}
            variants={item}
            className={`${squareSizes[post.size]} absolute -z-10`}
            style={{
              left: `${post.x}%`,
              top: `${post.y}%`,
            }}
            onAnimationComplete={() => {
              console.log(
                "Animation complete for post:",
                i,
                i === posts.length - 1,
              );
              if (i === posts.length - 1) callback();
            }}
          >
            <div className="relative h-full w-full">
              <Img src="/marriage.jpg" />
            </div>
          </Card>
        );
      })}
    </motion.div>
  );
};

export default PostBoard;
