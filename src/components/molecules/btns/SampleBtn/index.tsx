import Btn from "@/components/atoms/Btn";
import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <Btn
      pending={false}
      className="w-fit cursor-pointer text-lg uppercase"
      bgColor="bg-blue-500"
    >
      <Link href={`/detail/rhsiddlsidhd1`}>Sample</Link>
    </Btn>
  );
};

export default index;
