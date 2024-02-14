export function randomNumbers(): number[] {
  return new Array(1000).fill(0).map(() => random());
}

function random(): number {
  return Math.floor(Math.random() * 101);
}
