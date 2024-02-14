import { bubbleSort } from "./sortings/bubble-sort";
import { randomNumbers } from "./random";
import { performance } from "perf_hooks";
import { selectionSort } from "./sortings/selection-sort";
import { insertionSort } from "./sortings/insertion-sort";
import { quicksort } from "./sortings/quicksort";
import { mergeSort } from "./sortings/merge-sort";

class SortResults {
  public performance: number[] = [];
  public result: number[][] = [];

  constructor(
    public name: string,
    public sort: (values: number[]) => number[]
  ) {}

  public getAvgPerformance(): number {
    if (!this.performance.length) throw new Error("Have no performance data!");
    const sum = this.performance.reduce((sum, time) => {
      return sum + time;
    }, 0);
    return sum / this.performance.length;
  }
}

const sortingResults: SortResults[] = [
  new SortResults("Bubble sort", bubbleSort),
  new SortResults("Selection sort", selectionSort),
  new SortResults("Insertion sort", insertionSort),
  new SortResults("Quicksort sort", quicksort),
  new SortResults("Merge sort", mergeSort),
];

function testSorting(sortings: SortResults[]): SortResults[] {
  for (let i = 0; i < 10; i++) {
    const values = randomNumbers();

    sortings.forEach((sort) => {
      const startTime = performance.now();
      const result = sort.sort(values);
      const endTime = performance.now();
      sort.performance.push(endTime - startTime);
      sort.result.push(result);
    });
  }
  return sortings;
}

testSorting(sortingResults).forEach((sort) => {
  console.log(
    `${sort.name} average performance is ${sort.getAvgPerformance()}ms`
  );
});
