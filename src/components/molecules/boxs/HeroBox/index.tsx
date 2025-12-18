import React from "react";
import Box from "@/components/layout/Box/index";
import { introMessage } from "@/shared/constants";
import SampleBtn from "@/components/molecules/btns/SampleBtn/index";

const HeroBox = () => {
  return (
    <Box className="grid grid-cols-1 place-items-center gap-4">
      <h1 className="text-center text-4xl font-bold text-gray-800">
        {introMessage}
      </h1>
      <SampleBtn />
    </Box>
  );
};

export default HeroBox;
