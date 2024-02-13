import { bubbleSort } from "./sortings/bubble-sort";
import { randomNumbers } from "./random";
import { performance } from "perf_hooks";
import { selectionSort } from "./sortings/selection-sort";
import { insertionSort } from "./sortings/insertion-sort";
import { quicksort } from "./sortings/quicksort";

interface SortResult {
  name: string;
  performance: number;
  result: number[];
}

interface Sorting {
  name: string;
  sort: (values: number[]) => number[];
}

const randomValues: number[] = randomNumbers();
console.log("Input: ", randomValues);

const sortings: Sorting[] = [
  {
    name: "Bubble sort",
    sort: bubbleSort,
  },
  {
    name: "Selection sort",
    sort: selectionSort,
  },
  {
    name: "Insertion sort",
    sort: insertionSort,
  },
  {
    name: "Quicksort sort",
    sort: quicksort,
  },
];

function runSortings(sortings: Sorting[], values: number[]): SortResult[] {
  const results: SortResult[] = [];

  sortings.forEach((sort) => {
    const startTime = performance.now();
    const result = sort.sort(values);
    const endTime = performance.now();
    results.push({ name: sort.name, performance: endTime - startTime, result });
  });

  return results;
}

runSortings(sortings, randomValues).forEach(({ name, performance, result }) => {
  console.log(`${name} performance is ${performance}ms; result is ${result}`);
});
