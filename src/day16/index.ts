import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";

const prepareInput = (rawInput: string) => {
  let [d, y, n] = rawInput.split(`${EOL}${EOL}`);
  let definitions = {};

  d.split(EOL).forEach((d) => {
    let [name, values] = d.split(": ");
    definitions[name] = values
      .split(" or ")
      .map((range) => range.split("-").map((i) => parseInt(i)));
  });

  let yourTicket = y
    .split(EOL)[1]
    .split(",")
    .map((i) => parseInt(i));

  let nearbyTickets = n
    .split(EOL)
    .slice(1)
    .map((row) => row.split(",").map((i) => parseInt(i)));

  return {
    definitions,
    yourTicket,
    nearbyTickets,
  };
};
const input = prepareInput(readInput());

const goA = (input) => {
  let ranges = Object.values(input.definitions).flat();
  let invalid = input.nearbyTickets.flat().filter((n) => {
    return !ranges.some(([min, max]) => n >= min && n <= max);
  });
  return invalid.reduce((acc, n) => acc + n, 1);
};

const goB = (input) => {
  let ranges = Object.values(input.definitions).flat();
  let valid = input.nearbyTickets.filter((row) => {
    return row.every((n) => {
      return ranges.some(([min, max]) => n >= min && n <= max);
    });
  });
  let discoveredMappings = {};
  for (let definition in input.definitions) {
    discoveredMappings[definition] = [];
  }

  for (let i = 0; i < input.yourTicket.length; i++) {
    for (let definition in input.definitions) {
      let testNumbers = [input.yourTicket[i], ...valid.map((row) => row[i])];
      if (
        testNumbers.every((testNumber) =>
          input.definitions[definition].some(
            ([min, max]) => testNumber >= min && testNumber <= max
          )
        )
      ) {
        discoveredMappings[definition].push(i);
      }
    }
  }

  console.log(discoveredMappings);
  while (Object.values(discoveredMappings).some((f) => (f as any).length > 1)) {
    for (let field in discoveredMappings) {
      if (discoveredMappings[field].length === 1) {
        let stableMapping = discoveredMappings[field][0];
        for (let otherField in discoveredMappings) {
          if (otherField === field) {
            continue;
          }
          if (discoveredMappings[otherField].includes(stableMapping)) {
            // remove it from the list and set changed to true
            discoveredMappings[otherField] = discoveredMappings[
              otherField
            ].filter((i) => i !== stableMapping);
          }
        }
      }
    }
  }
  let total = 1;
  console.log(discoveredMappings);
  for (let field in discoveredMappings) {
    if (field.startsWith("departure")) {
      total *= input.yourTicket[discoveredMappings[field][0]];
    }
  }
  return total;
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
