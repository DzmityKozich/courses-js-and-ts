export function randomNumbers(): number[] {
  return new Array(10).fill(0).map(() => random());
}

function random(): number {
  return Math.floor(Math.random() * 101);
}
