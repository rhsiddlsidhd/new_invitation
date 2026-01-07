"use client";

import { useState, useEffect } from "react";

import { differenceInDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar } from "@/components/atoms/Calendar";

interface DdayCounterProps {
  weddingDate: Date;
}

export function DdayCounter({ weddingDate }: DdayCounterProps) {
  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const calculateDays = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const wedding = new Date(weddingDate);
      wedding.setHours(0, 0, 0, 0);
      const diff = differenceInDays(wedding, today);
      setDaysLeft(diff);
    };

    calculateDays();
    const interval = setInterval(calculateDays, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, [weddingDate]);

  return (
    <section className="bg-muted/30 px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-6 font-serif text-3xl">
            Wedding Day
          </h2>
          <div className="inline-flex items-baseline gap-3">
            <span className="text-primary text-6xl font-bold">
              {daysLeft >= 0 ? daysLeft : 0}
            </span>
            <span className="text-muted-foreground text-2xl">일 남음</span>
          </div>
          <p className="text-muted-foreground mt-4">
            {format(weddingDate, "yyyy년 M월 d일 EEEE", { locale: ko })}
          </p>
        </div>

        {/* Calendar */}
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={weddingDate}
            className="border-border bg-card rounded-xl border shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}
