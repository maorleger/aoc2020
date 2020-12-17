import { test, readInput } from "../utils/index";

const prepareInput = (rawInput: string): Array<Record> => {
  return rawInput
    .split("\n")
    .map((row) => /(?<min>\d+)-(?<max>\d+) (?<char>.): (?<password>.*)/.exec(row).groups);
};

interface Record {
  [key: string]: string;
}

const input = prepareInput(readInput());

const goA = (input: Array<Record>): number =>
  input.reduce((acc: number, { min, max, char, password }: Record) => {
    let count = password.split("").filter((c) => c === char).length;

    if (count >= parseInt(min) && count <= parseInt(max)) {
      return acc + 1;
    }
    return acc;
  }, 0);

const goB = (input: Array<Record>) =>
  input.reduce((acc: number, { min, max, char, password }: Record) => {
    let posA = password[parseInt(min) - 1] === char;
    let posB = password[parseInt(max) - 1] === char;

    if (posA !== posB) {
      return acc + 1;
    }

    return acc;
  }, 0);

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
