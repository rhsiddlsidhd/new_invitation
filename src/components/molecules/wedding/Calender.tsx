import DateDisplay from "@/components/atoms/Date";
import React, { useMemo } from "react";

const Calender = ({ date }: { date: string }) => {
  const newDate = new Date(date);
  const weddingDay = {
    year: newDate.getFullYear(),
    month: newDate.getMonth() + 1,
    date: newDate.getDate(),
    day: newDate.getDay(),
  };

  const getDayOfMonth = (year: number, month: number) => {
    const dayInMonth = [];
    const start = new Date(year, month - 1, 1).getDay();

    for (let i = 0; i < start; i++) {
      dayInMonth.push(null);
    }

    const length = new Date(year, month, 0).getDate();
    for (let i = 1; i <= length; i++) {
      dayInMonth.push(i);
    }

    return dayInMonth;
  };

  const monthCalender = useMemo(
    () => getDayOfMonth(weddingDay.year, weddingDay.month),
    [weddingDay.year, weddingDay.month],
  );

  const weekOfKr = ["일", "월", "화", "수", "목", "금", "토"] as const;

  return (
    <div className="m-auto w-3/4 border-t-1 border-b-1 border-dotted border-y-gray-200 py-2 max-sm:w-full">
      <ul className="grid grid-cols-7">
        {weekOfKr.map((kr, i) => {
          const isToday = i === 0 || i === 6;
          return (
            <li key={i} className="p-2 text-center">
              <span
                className={`flex items-center justify-center rounded-full ${isToday && "text-red-300"} p-1 text-xs`}
              >
                {kr}
              </span>
            </li>
          );
        })}
      </ul>
      <ul className="grid grid-cols-7">
        {monthCalender.map((day, idx) => {
          const Dday = day === weddingDay.date;
          return (
            <li
              key={idx}
              className={`px-1 py-3 text-center ${Dday && "rounded-full bg-red-300 font-bold text-white"} text-xs`}
            >
              {day}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Calender;
