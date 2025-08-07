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
    <div>
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <IntroBanner isVisible={showBanner} />
        <PostBoard posts={posts} callback={() => setShowBanner(true)} />
      </div>
      <div className="relative h-screen">
        <h2>2장</h2>
      </div>
    </div>
  );
};

export default HomeForm;
