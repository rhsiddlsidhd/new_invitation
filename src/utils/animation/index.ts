export const generateParticles = (count: number) => {
  return Array.from({ length: count }, () => {
    let x, y;
    const zone = Math.floor(Math.random() * 4);
    switch (zone) {
      case 0: // 왼쪽영역
        x = Math.random() * 25 + 5; // 5% ~ 30%
        y = Math.random() * 80 + 10; // 10% ~ 90%
        break;
      case 1: // 오른쪽영역
        x = Math.random() * 25 + 70; // 70% ~ 95%
        y = Math.random() * 80 + 10; // 10%
        break;
      case 2: // 위쪽영역
        x = Math.random() * 60 + 20; // 20% ~ 80%
        y = Math.random() * 20 + 5; // 5%
        break;
      case 3: // 아래쪽영역
        x = Math.random() * 60 + 20; // 20% ~ 80%
        y = Math.random() * 20 + 75; // 75% ~ 95%
        break;
      default:
        x = 10;
        y = 10;
    }

    return {
      size: Math.floor(Math.random() * 14),
      x,
      y,
      z: Math.random() * 300 - 150,
      moveX: (Math.random() - 0.5) * 20,
      moveY: (Math.random() - 0.5) * 20,
    };
  });
};
