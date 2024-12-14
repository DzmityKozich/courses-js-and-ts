export function randomNumbers(amount: number = 1000): number[] {
  return new Array(amount).fill(0).map(() => random());
}

function random(): number {
  return Math.floor(Math.random() * 101);
}
