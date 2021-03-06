import { test, readInput } from "../utils/index";
import { EOL } from "os";

const prepareInput = (rawInput: string) => rawInput.split(EOL).map((row) => parseInt(row));

const input = prepareInput(readInput());

const twoSum = (input: number[], target: number): number | undefined => {
  let helper = new Set<number>();

  for (let i = 0; i < input.length; i++) {
    if (helper.has(target - input[i])) {
      return input[i] * (target - input[i]);
    }
    helper.add(input[i]);
  }

  return null;
};

const goA = (input: number[]) => {
  let preambleSize = 25;

  for (let i = preambleSize; i < input.length; i++) {
    let preamble = input.slice(i - preambleSize, i);
    if (!twoSum(preamble, input[i])) {
      return input[i];
    }
  }
};

const goB = (input: number[]) => {
  let target = goA(input);
  let i = 0;
  let j = 0;
  let sum = input[i];
  while (j < input.length && i < input.length) {
    if (sum === target) {
      let slice = input.slice(i, j);
      return Math.max(...slice) + Math.min(...slice);
    } else if (sum < target) {
      // we can add another digit, so bump j and add its value to sum
      j++;
      sum += input[j];
    } else {
      // we overshot it, so remove the current value at i and bump i
      sum -= input[i];
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
