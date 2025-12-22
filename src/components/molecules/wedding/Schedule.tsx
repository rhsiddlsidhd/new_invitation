"use client";
import DateDisplay from "@/components/atoms/Date/Date";
import React from "react";

const Schedule = ({ date }: { date: string }) => {
  // 시.. 시간데이터를 안받았다... 하

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <div className="text-3xl font-light tracking-widest">
        <DateDisplay date={date} type="slash" />
      </div>
      <div className="text-sm tracking-widest">
        <DateDisplay date={date} type="weekdayEng" />
      </div>
    </div>
  );
};

export default Schedule;
