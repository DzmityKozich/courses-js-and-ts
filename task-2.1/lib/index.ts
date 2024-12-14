const colorChangeBtn: HTMLButtonElement =
  document.querySelector(".change-color-btn")!;
const container: HTMLDivElement = document.querySelector(".container")!;
const infoColor: HTMLDivElement = document.querySelector(".info-color")!;

const randomHexColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const randomRgbColor = (): string => {
  const r = random(0, 255);
  const g = random(0, 255);
  const b = random(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
};

const randomRgbaColor = (): string => {
  const r = random(0, 255);
  const g = random(0, 255);
  const b = random(0, 255);
  const a = Math.random().toFixed(1);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const randomColor = (): string => {
  const randomFns = [randomHexColor, randomRgbColor, randomRgbaColor];
  const index = random(0, 2);
  return randomFns[index]();
};

const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

colorChangeBtn.addEventListener("click", () => {
  const color = randomColor();
  container.style.backgroundColor = color;
  infoColor.textContent = color;
  infoColor.style.color = color;
});
