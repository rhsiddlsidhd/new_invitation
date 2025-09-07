import Card from "@/components/atoms/Card";
import Img from "@/components/atoms/Img";
import { squareSizes } from "@/contants";
import { Post } from "@/types";
import React from "react";

interface FloatingCardProps {
  idx: number;
  post: Post;
  posts: Post[];
  callback: () => void;
  item: any;
}

const FloatingCard = ({
  idx,
  post,
  posts,
  item,
  callback,
}: FloatingCardProps) => {
  return (
    <Card
      key={idx}
      custom={post}
      variants={item}
      className={`${squareSizes[post.size]} absolute -z-10`}
      onAnimationComplete={() => {
        if (idx === posts.length - 1) callback();
      }}
    >
      <Img src="/marriage.jpg" />
    </Card>
  );
};

export default FloatingCard;
