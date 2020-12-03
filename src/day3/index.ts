import { readInput } from "../utils/index";

const prepareInput = (rawInput: string): string[][] =>
  rawInput.split("\r\n").map((line) => line.split(""));

const input = prepareInput(readInput());

const goA = (input: string[][], right: number, down: number) => {
  let row = 0;
  let col = 0;
  let count = 0;

  while (row < input.length) {
    if (input[row][col] == "#") {
      count++;
    }

    col = (col + right) % input[row].length;
    row += down;
  }
  return count;
};

const goB = (input: string[][]) =>
  [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ].reduce((acc, [right, down]) => acc * goA(input, right, down), 1);

/* Results */

console.time("Time");
const resultA = goA(input, 3, 1);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
