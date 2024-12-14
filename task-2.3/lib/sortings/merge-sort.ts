export function mergeSort(values: number[]): number[] {
  const array = [...values];
  if (array.length <= 1) return array;

  const middleIndex = Math.floor(array.length / 2);
  const leftSide = array.slice(0, middleIndex);
  const rightSide = array.slice(middleIndex, array.length);

  // Sort two halves of split array
  const leftSortedArray = mergeSort(leftSide);
  const rightSortedArray = mergeSort(rightSide);

  // Merge two sorted arrays into one.
  return mergeSortedArrays(leftSortedArray, rightSortedArray);
}

function mergeSortedArrays(leftSide: number[], rightSide: number[]) {
  const sortedArray = [];

  // Use array pointers to exclude old elements after they have been added to the sorted array.
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftSide.length && rightIndex < rightSide.length) {
    let minElement: number;

    // Find the minimum element between the left and right array.
    if (leftSide[leftIndex] <= rightSide[rightIndex]) {
      minElement = leftSide[leftIndex];
      // Increment index pointer to the right
      leftIndex += 1;
    } else {
      minElement = rightSide[rightIndex];
      // Increment index pointer to the right
      rightIndex += 1;
    }

    // Add the minimum element to the sorted array.
    sortedArray.push(minElement);
  }

  // There will be elements remaining from either the left OR the right
  // Concatenate the remaining elements into the sorted array
  return [
    ...sortedArray,
    ...leftSide.slice(leftIndex),
    ...rightSide.slice(rightIndex),
  ];
}
