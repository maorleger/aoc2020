import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";

const prepareInput = (rawInput: string): number[] =>
  rawInput.split(EOL).map((row) => parseInt(row));

const rawInput = readInput();

const goA = (input: number[]) => {
  const transform = (value: number, subject: number, loopSize: number) => {
    while (loopSize-- > 0) {
      value = (value * subject) % 20201227;
    }
    return value;
  };
  const calculateLoopSize = (target: number) => {
    const subject = 7;
    let current = 1;
    let loopCount = 0;
    while (current !== target) {
      current = transform(current, subject, 1);
      loopCount++;
    }
    return loopCount;
  };

  let [pair1, pair2] = input.map((publicKey) => ({
    publicKey,
    loopSize: calculateLoopSize(publicKey),
  }));
  return transform(1, pair1.publicKey, pair2.loopSize);
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

console.log("Solution to part 1:", resultA, 18329280);
console.log("Solution to part 2:", resultB);
