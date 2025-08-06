"use client";
import React from "react";
import { motion, stagger } from "framer-motion";
import { Post } from "@/types";
import { squareSizes } from "@/contants";
import Card from "../atoms/Card";
import Img from "../atoms/Img";

const PostBoard = ({
  posts,
  callback,
}: {
  posts: Post[];
  callback: () => void;
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
      className="absolute top-0 left-0 h-full w-full perspective-distant transform-3d"
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

export default PostBoard;
