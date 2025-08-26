import { calculateCountdown, updateCoundownMessage } from "@/utils/date";
import React, { useEffect, useState } from "react";

const DigitalWatch = ({ date }: { date: string }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hour: 0,
    min: 0,
    sec: 0,
  });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const { days, hour, min, sec } = calculateCountdown({
        weddingDate: date,
      });
      setCountdown({ days, hour, min, sec });
    }, 1000);
    return () => clearInterval(id);
  }, [date]);

  useEffect(() => {
    const msg = updateCoundownMessage(
      countdown.days,
      countdown.hour,
      countdown.min,
    );
    setMessage((prev) => (prev === msg ? prev : msg));
  }, [countdown]);

  return (
    <div>
      <div className="m-auto grid w-3/4 grid-cols-4 gap-2 max-sm:w-full">
        {Object.entries(countdown).map(([key, value], i) => {
          return (
            <div key={i} className="text-center">
              <p className="text-xs text-gray-300">{key.toUpperCase()}</p>
              <p className="text-md font-bold text-gray-400">{value}</p>
            </div>
          );
        })}
      </div>
      <p className="p-4 text-center text-xs font-bold text-gray-300">
        {message}
      </p>
    </div>
  );
};

export default DigitalWatch;
