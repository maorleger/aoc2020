import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";
import { exit } from "process";

const prepareInput = (rawInput: string) => rawInput.split(EOL).map((row) => parseInt(row));

const input = prepareInput(readInput());

const goA = (input: number[]) => {
  let adapters = _.transform(input, (acc, curr: number) => (acc[curr] = true), []);
  let currentOutlet = 0;
  let frequencies = [0, 0, 0];

  while (currentOutlet < adapters.length - 1) {
    for (let i = currentOutlet + 1; i < currentOutlet + 4; i++) {
      if (adapters[i]) {
        frequencies[i - currentOutlet - 1]++;
        currentOutlet = i;
        break;
      }
    }
  }

  // for the last adapter
  currentOutlet += 3;
  frequencies[2]++;

  return frequencies[0] * frequencies[2];
};

const goB = (input: number[]) => {
  let adapters: number[] = input.sort((a, b) => a - b);
  let endVoltage = adapters[adapters.length - 1] + 3;
  adapters.unshift(0);
  adapters.push(endVoltage);

  let step = (voltage: number, mem: {}): number => {
    if (voltage === 0) {
      return 1;
    }
    if (!adapters.includes(voltage)) {
      return 0;
    }

    if (!mem[voltage]) {
      mem[voltage] = step(voltage - 1, mem) + step(voltage - 2, mem) + step(voltage - 3, mem);
    }

    return mem[voltage];
  };

  return step(endVoltage, {});
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
