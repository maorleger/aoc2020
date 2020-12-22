import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";

const prepareInput = (rawInput: string) =>
  rawInput.split(`${EOL}${EOL}`).reduce((acc, group) => {
    let [player, ...cards] = group.split(EOL);
    acc[player.slice(7, 8)] = cards.map((card) => parseInt(card));
    return acc;
  }, {});

const input = prepareInput(readInput());

const goA = (input: { [k: string]: number[] }) => {
  console.log(input);
  while (Object.values(input).every((c) => c.length > 0)) {
    let top1 = input["1"].shift();
    let top2 = input["2"].shift();
    if (top1 > top2) {
      input["1"].push(top1, top2);
    } else {
      input["2"].push(top2, top1);
    }
  }

  // compute the score
  let score = input["1"].length > 0 ? input["1"] : input["2"];
  return _.zip(score, _.range(score.length, 0)).reduce((acc, [a, b]) => {
    acc += a * b;
    return acc;
  }, 0);
};

const goB = (input) => {
  return;
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
