import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";

const prepareInput = (rawInput: string) => rawInput.split(",");

const input = prepareInput(readInput());

const compute = (rounds, input) => {
  const numbers = {};
  let turn = 1;
  let lastNumber = null;

  for (let number of input) {
    numbers[number] = [turn];
    turn++;
    lastNumber = number;
  }

  for (; turn < rounds + 1; turn++) {
    if (turn % 1000000 === 0) {
      console.log(turn);
    }
    let number;
    if (numbers[lastNumber].length === 1) {
      number = 0;
    } else {
      // console.log(`${lastNumber} was spoken on turn ?`);
      let [x1, x2] = numbers[lastNumber].slice(-2);
      number = x2 - x1;
    }

    if (!numbers[number]) {
      numbers[number] = [];
    }

    numbers[number].push(turn);
    lastNumber = number;
  }
  return lastNumber;
};

const goA = (input) => {
  return compute(2020, input);
};

const goB = (input) => {
  return compute(30000000, input);
};

/* Tests */

// test()

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA, 1325);
console.log("Solution to part 2:", resultB, 59006);
