const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const getTimeDiff = (target: Date, now: Date = new Date()) => {
  const diff = Math.max(target.getTime() - now.getTime(), 0);

  const days = Math.floor(diff / DAY);
  const hours = Math.floor((diff % DAY) / HOUR);
  const minutes = Math.floor((diff % HOUR) / MINUTE);
  const seconds = Math.floor((diff % MINUTE) / SECOND);

  return { diff, days, hours, minutes, seconds };
};

export const calculateCountdown = ({
  weddingDate,
  now,
}: {
  weddingDate: Date;
  now?: Date;
}) => {
  const { days, hours, minutes, seconds } = getTimeDiff(weddingDate, now);

  return {
    days,
    hour: hours,
    min: minutes,
    sec: seconds,
  };
};

export const updateCountdownMessage = (
  weddingDate: Date,
  now?: Date,
): string => {
  const { days, hours, minutes } = getTimeDiff(weddingDate, now);

  if (days > 0) return `결혼식까지 ${days}일 남았습니다`;
  if (hours > 0) return `결혼식까지 ${hours}시간 남았습니다`;
  if (minutes > 0) return `결혼식까지 ${minutes}분 남았습니다`;

  return "결혼식이 끝났습니다";
};
