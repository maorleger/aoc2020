import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";

const prepareInput = (rawInput: string) => rawInput;

const rawInput = readInput();

const goA = (input) => {
  return;
};

const goB = (input) => {
  return;
};

/* Tests */

// test()

/* Results */

console.time("Time");
const resultA = goA(prepareInput(rawInput));
const resultB = goB(prepareInput(rawInput));
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
