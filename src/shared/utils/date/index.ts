export const calculateCountdown = ({
  weddingDate,
}: {
  weddingDate: string;
}) => {
  const weddingDateSeconds = Math.floor(new Date(weddingDate).getTime() / 1000);
  const currentDateSeconds = Math.floor(new Date().getTime() / 1000);

  const remainingTime = weddingDateSeconds - currentDateSeconds;
  let days = Math.floor(remainingTime / (60 * 60 * 24));
  days = Math.max(0, days);
  let hour = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
  hour = Math.max(0, hour);
  let min = Math.floor((remainingTime % (60 * 60)) / 60);
  min = Math.max(0, min);
  let sec = Math.floor(remainingTime % 60);
  sec = Math.max(0, sec);

  return { days, hour, min, sec };
};

export const updateCoundownMessage = (
  days: number,
  hours: number,
  minutes: number,
): string => {
  let msg;
  switch (true) {
    case days !== 0:
      msg = `결혼식까지 ${days}일 남았습니다`;
      break;
    case hours !== 0:
      msg = `결혼식까지 ${hours}시간 남았습니다`;
      break;
    case minutes !== 0:
      msg = `결혼식까지 ${minutes}분 남았습니다`;
      break;
    default:
      msg = `결혼식이 끝났습니다`;
  }
  return msg;
};
