function percentageAnimation(targetPercentage) {
  // const box = document.getElementById("percentage");
  // const step = 500 / (targetPercentage * 10);
  // let current = 0;

  // const interval = setInterval(() => {
  //     current += 0.1;
  //     if (current >= targetPercentage) {
  //         current = targetPercentage;
  //         clearInterval(interval);
  //     }
  //     box.textContent = `You've seen: ${current.toFixed(1)}% of the world!`;
  const box = document.getElementById("percentage");
  if (!box) return;

  // Extract current percentage from text
  const match = box.textContent.match(/([\d.]+)%/);
  let current = match ? parseFloat(match[1]) : 0;

  const step = 0.1;
  const steps = Math.abs((targetPercentage - current) / step);
  const stepTime = steps > 0 ? 500 / steps : 0;
  const direction = targetPercentage > current ? 1 : -1;

  const interval = setInterval(() => {
    current += step * direction;

    const done =
      direction > 0 ? current >= targetPercentage : current <= targetPercentage;

    if (done) {
      current = targetPercentage;
      clearInterval(interval);
    }

    box.textContent = `${current.toFixed(1)}% `;
  }, stepTime);
}
