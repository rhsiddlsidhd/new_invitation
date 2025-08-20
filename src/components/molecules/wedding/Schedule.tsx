"use client";
import React from "react";

const Schedule = ({ date }: { date: string }) => {
  // 시.. 시간데이터를 안받았다... 하
  const newDate = new Date(date);
  const weddingDay = {
    year: newDate.getFullYear(),
    month: newDate.getMonth() + 1,
    date: newDate.getDate(),
    day: newDate.getDay(),
  };
  const weekdaysOfEng = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="flex justify-center">
      {weddingDay.year}/{weddingDay.month}/{weddingDay.date}
      <span className="mx-2">{weekdaysOfEng[weddingDay.day]}</span>
    </div>
  );
};

export default Schedule;
