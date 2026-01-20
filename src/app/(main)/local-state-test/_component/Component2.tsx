"use client";
import React, { useState } from "react";

const Component2 = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="border-accent-foreground grid grid-cols-2 border-2">
      <button onClick={() => setCount(count + 1)}>증가</button>
      <h1 className="text-center">{count}</h1>
    </div>
  );
};

export default Component2;
