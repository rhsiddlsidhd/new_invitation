import { form } from "motion/react-client";
import React from "react";

interface DateDisplayProps {
  date: string;
  type: "slash" | "dot" | "text" | "weekdayKr" | "weekdayEng";

  className?: string;
}

const DateDisplay = ({ date, type, className }: DateDisplayProps) => {
  let formatted;

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

  const weekdayOfKr = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  switch (type) {
    case "slash":
      formatted = `${weddingDay.year}/${weddingDay.month}/${weddingDay.date}`;
      break;
    case "dot":
      formatted = `${weddingDay.year}.${weddingDay.month}.${weddingDay.date}`;
      break;
    case "text":
      formatted = `${weddingDay.year}년 ${weddingDay.month}월 ${weddingDay.date}일`;
      break;
    case "weekdayKr":
      formatted = `${weekdayOfKr[weddingDay.day]}`;
      break;
    case "weekdayEng":
      formatted = `${weekdaysOfEng[weddingDay.day]}`;
      break;

    default:
      formatted = `${weddingDay.year}-${weddingDay.month}-${weddingDay.date}`;
  }

  return <span className={`${className}`}>{formatted}</span>;
};

export default DateDisplay;
