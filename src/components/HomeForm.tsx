"use client";

import React, { useState } from "react";
import { Post } from "@/types";
import PostBoard from "./molecules/PostBoard";
import IntroBanner from "./molecules/IntroBanner";

interface HomeFormProps {
  posts: Post[];
}

const HomeForm = ({ posts }: HomeFormProps) => {
  const [showBanner, setShowBanner] = useState(false);
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <IntroBanner isVisible={showBanner} />
      <PostBoard posts={posts} callback={() => setShowBanner(true)} />
    </div>
  );
};

export default HomeForm;
