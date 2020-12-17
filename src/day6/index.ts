import { AsyncLocalStorage } from "async_hooks";
import { test, readInput } from "../utils/index";

const prepareInput = (rawInput: string) =>
  rawInput.split("\r\n\r\n").map((group) => group.split("\r\n").map((person) => person.split("")));

const input = prepareInput(readInput());

const goA = (input) => {
  let sum = 0;

  for (let group of input) {
    let collection = new Set<string>();

    for (let person of group) {
      for (let answer of person) {
        collection.add(answer);
      }
    }
    sum += collection.size;
  }
  return sum;
};

const goB = (input) => {
  let sum = 0;

  for (let group of input) {
    let groupSum = 0;
    let allAnswers = group.flatMap((g) => g);
    let uniqueAnswers = new Set<string>(allAnswers);
    for (let answer of uniqueAnswers) {
      if (allAnswers.filter((c) => c === answer).length === group.length) {
        groupSum += 1;
      }
    }
    sum += groupSum;
  }
  return sum;
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
