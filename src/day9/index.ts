import { test, readInput } from "../utils/index";
import { EOL } from "os";

const prepareInput = (rawInput: string) =>
  rawInput.split(EOL).map((row) => parseInt(row));

const input = prepareInput(readInput());

const twoSum = (input, target): number | undefined => {
  let helper = new Set<number>();

  for (let i = 0; i < input.length; i++) {
    if (helper.has(target - input[i])) {
      return input[i] * (target - input[i]);
    }
    helper.add(input[i]);
  }

  return null;
};

const goA = (input) => {
  let preambleSize = 25;

  for (let i = preambleSize; i < input.length; i++) {
    let preamble = input.slice(i - preambleSize, i);
    if (!twoSum(preamble, input[i])) {
      return input[i];
    }
  }
};

const goB = (input) => {
  let number = goA(input);
  let i = 0;
  let j = 1;
  while (j < input.length && i < input.length) {
    let slice = input.slice(i, j);
    let sum = slice.reduce((acc, n) => acc + n, 0);
    if (sum === number) {
      return Math.max(...slice) + Math.min(...slice);
    } else if (sum < number) {
      j++;
    } else {
      i++;
    }
  }
};

/* Tests */

// test()

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
