"use client";
import React from "react";
import useCount from "../_hooks/useCount";

const Component1 = () => {
  const { count, increment } = useCount();
  return (
    <div className="border-foreground grid grid-cols-2 border-2">
      <button onClick={() => increment()}>증가</button>
      <h1 className="text-center">{count}</h1>
    </div>
  );
};

export default Component1;
