import { test, readInput } from "../utils/index";
import { EOL } from "os";

const prepareInput = (rawInput: string) =>
  rawInput.split(EOL).reduce((acc, line) => {
    let [container, right] = line.split(" bags contain ");
    let contents = (right as any).matchAll(
      /(?<quantity>\d+) (?<type>.+?)(?= bag)/g
    );
    if (!acc[container]) {
      acc[container] = [];
    }

    for (let { groups } of contents) {
      acc[container].push({
        type: groups.type,
        quantity: parseInt(groups.quantity),
      });
    }
    return acc;
  }, {});

const input = prepareInput(readInput());

const computeResultA = (input, current, set) => {
  for (let key in input) {
    for (let { type } of input[key]) {
      if (!set.has(key) && type === current) {
        set.add(key);
        computeResultA(input, key, set);
      }
    }
  }
  return set.size;
};

const goA = (input) => computeResultA(input, "shiny gold", new Set());

const computeResultB = (mapping, bag) => {
  if (mapping[bag]) {
    return mapping[bag].reduce(
      (acc, { type, quantity }) =>
        acc + quantity * (1 + computeResultB(mapping, type)),
      0
    );
  } else {
    return 0;
  }
};

const goB = (input) => computeResultB(input, "shiny gold");

/* Tests */

// test()

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
