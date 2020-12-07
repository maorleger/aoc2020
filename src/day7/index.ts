import { test, readInput } from "../utils/index";
import { EOL } from "os";

const prepareInput = (rawInput: string) => rawInput.split(EOL);

const input = prepareInput(readInput());

const computeResult = (mapping, current, set) => {
  if (mapping[current]) {
    for (let container of mapping[current]) {
      if (!set.has(container)) {
        set.add(container);
        computeResult(mapping, container, set);
      }
    }
  }
  return set;
};

const goA = (input) => {
  let mapping = {};
  for (let line of input) {
    let [left, right] = line.split("contain");
    let container = left.replace(" bags ", "");
    let contents = right.matchAll(/(?<quantity>\d+) (?<type>.+?)(?= bag)/g);

    for (let content of contents) {
      let type = content.groups.type;
      if (!mapping[type]) {
        mapping[type] = [];
      }
      mapping[type].push(container);
    }
  }

  let result = computeResult(mapping, "shiny gold", new Set<string>());
  return result.size;
};

const computeResult2 = (mapping, bag) => {
  if (mapping[bag]) {
    return mapping[bag].reduce(
      (acc, { type, quantity }) =>
        acc + parseInt(quantity) * (1 + computeResult2(mapping, type)),
      0
    );
  } else {
    return 0;
  }
};

const goB = (input) => {
  let mapping = {};
  let counts = {};
  for (let line of input) {
    let [left, right] = line.split("contain");
    let container: string = left.replace(" bags ", "");
    let contents = right.matchAll(/(?<quantity>\d+) (?<type>.+?)(?= bag)/g);
    if (!mapping[container]) {
      mapping[container] = [];
    }

    for (let content of contents) {
      let type: string = content.groups.type;
      let quantity = parseInt(content.groups.quantity);

      mapping[container].push({ type, quantity });
    }
  }

  let result = computeResult2(mapping, "shiny gold");
  return result;
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
