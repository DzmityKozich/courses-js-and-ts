/**
 * Pick an element, called a pivot, from the array.
   Partitioning: reorder the array so that all elements with values less than the pivot come before the pivot, while all elements with values greater than the pivot come after it (equal values can go either way). After this partitioning, the pivot is in its final position. This is called the partition operation.
   Recursively apply the above steps to the sub-array of elements with smaller values and separately to the sub-array of elements with greater values.
 */

export function quicksort(values: number[]): number[] {
  const array = [...values];

  if (!array.length) return [];

  const leftSide = [];
  const rightSide = [];

  const pivotElement = array.shift()!;
  const centerArray = [pivotElement];

  while (array.length) {
    const currentElement = array.shift()!;
    if (currentElement === pivotElement) {
      centerArray.push(currentElement);
    } else if (currentElement < pivotElement) {
      leftSide.push(currentElement);
    } else {
      rightSide.push(currentElement);
    }
  }

  const leftArraySorted = quicksort(leftSide);
  const rightArraySorted = quicksort(rightSide);

  return [...leftArraySorted, ...centerArray, ...rightArraySorted];
}
