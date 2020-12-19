import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";
import { Grammar, Parser } from "nearley";
import * as grammar1 from "./grammar1";
import * as grammar2 from "./grammar2";

const prepareInput = (rawInput: string) => rawInput.split(EOL);

const input = prepareInput(readInput());

const goA = (entries: string[]) => {
  return entries.filter((entry) => {
    const parser = new Parser(Grammar.fromCompiled(grammar1));
    try {
      return parser.feed(entry).results.length > 0;
    } catch {
      return false;
    }
  }).length;
};

const goB = (entries: string[]) => {
  return entries.filter((entry) => {
    const parser = new Parser(Grammar.fromCompiled(grammar2));
    try {
      return parser.feed(entry).results.length > 0;
    } catch {
      return false;
    }
  }).length;
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
