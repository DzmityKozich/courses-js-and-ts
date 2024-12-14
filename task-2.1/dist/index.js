"use strict";
const colorChangeBtn = document.querySelector(".change-color-btn");
const container = document.querySelector(".container");
const infoColor = document.querySelector(".info-color");
const randomHexColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
const randomRgbColor = () => {
    const r = random(0, 255);
    const g = random(0, 255);
    const b = random(0, 255);
    return `rgb(${r}, ${g}, ${b})`;
};
const randomRgbaColor = () => {
    const r = random(0, 255);
    const g = random(0, 255);
    const b = random(0, 255);
    const a = Math.random().toFixed(1);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
};
const randomColor = () => {
    const randomFns = [randomHexColor, randomRgbColor, randomRgbaColor];
    const index = random(0, 2);
    return randomFns[index]();
};
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
colorChangeBtn.addEventListener("click", () => {
    const color = randomColor();
    container.style.backgroundColor = color;
    infoColor.textContent = color;
    infoColor.style.color = color;
});
//# sourceMappingURL=index.js.map