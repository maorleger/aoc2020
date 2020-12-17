import { readInput } from "../utils/index";

const prepareInput = (rawInput: string) => rawInput.split("\n").map((n) => parseInt(n));

const input: Array<number> = prepareInput(readInput());

const goA = (input): number => {
  let helper = new Set<number>();

  for (let i = 0; i < input.length; i++) {
    if (helper.has(2020 - input[i])) {
      return input[i] * (2020 - input[i]);
    }
    helper.add(input[i]);
  }
};

const goB = (input): number => {
  for (let i = 0; i < input.length; i++) {
    let target = 2020 - input[i];
    let helper = new Set<number>();

    for (let j = i + 1; j < input.length; j++) {
      if (helper.has(target - input[j])) {
        console.log(input[j], target - input[j], input[i]);
        return input[j] * (target - input[j]) * input[i];
      }
      helper.add(input[j]);
    }
  }
  return 0;
};

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
