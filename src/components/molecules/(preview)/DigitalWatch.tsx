"use client";
import { calculateCountdown, updateCountdownMessage } from "@/utils/date";

import React, { useEffect, useState } from "react";

const DigitalWatch = ({ date }: { date: Date }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hour: 0,
    min: 0,
    sec: 0,
  });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setCountdown(calculateCountdown({ weddingDate: date }));

      const msg = updateCountdownMessage(date);
      setMessage((prev) => (prev === msg ? prev : msg));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <section>
      <div className="m-auto grid w-3/4 grid-cols-4 gap-2 max-sm:w-full">
        {Object.entries(countdown).map(([key, value]) => (
          <div key={key} className="text-center">
            <p className="text-xs text-gray-300">{key.toUpperCase()}</p>
            <p className="text-md font-bold text-gray-400">{value}</p>
          </div>
        ))}
      </div>

      <p className="p-4 text-center text-xs font-bold text-gray-300">
        {message}
      </p>
    </section>
  );
};

export default DigitalWatch;
