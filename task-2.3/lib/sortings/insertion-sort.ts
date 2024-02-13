export function insertionSort(values: number[]): number[] {
  const array = [...values];

  for (let i = 1; i < array.length; i += 1) {
    let currentIndex = i;

    // Check if previous element is greater than current element.
    // If so, swap the two elements.
    while (
      currentIndex !== -1 &&
      array[currentIndex] < array[currentIndex - 1]
    ) {
      [array[currentIndex - 1], array[currentIndex]] = [
        array[currentIndex],
        array[currentIndex - 1],
      ];

      // Shift current index left.
      currentIndex -= 1;
    }
  }

  return array;
}
