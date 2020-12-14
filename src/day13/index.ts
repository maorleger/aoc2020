import { readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";
import { off } from "process";

const prepareInput = (rawInput: string) => {
  let [targetTime, schedules] = rawInput.split(EOL);
  return {
    targetTime,
    schedules: schedules.split(",").map((it) => parseInt(it)),
  };
};

const input = prepareInput(readInput());

const goA = ({ targetTime, schedules }) => {
  let earliestTimes = schedules
    .filter((it: number) => !isNaN(it))
    .map((id: number) => {
      let departurePrior = Math.floor(targetTime / id) * id;
      if (departurePrior === targetTime) {
        return {
          id,
          wait: 0,
        };
      } else {
        return {
          id,
          wait: departurePrior + id - targetTime,
        };
      }
    })
    .sort((a: { wait: number }, b: { wait: number }) => a.wait - b.wait);
  return earliestTimes[0].id * earliestTimes[0].wait;
};

const modularInverse = (a, mod) => {
  const b = a % mod;
  for (let i = 1; i < mod; i++) {
    if ((b * i) % mod === 1) {
      return i;
    }
  }
  return 1;
};
const crt = (congruences) => {
  const product = congruences.reduce((acc, val) => acc * val[0], 1);

  let sum = 0;
  for (const [ni, ai] of congruences) {
    const div = Math.floor(product / ni);
    sum += ai * modularInverse(div, ni) * div;
  }

  return sum % product;
};

// Not my solution
const goB = ({ schedules }) => {
  let validSchedules = schedules
    .map((schedule: number, offset: number) => ({ schedule, offset }))
    .filter(({ schedule }) => !isNaN(schedule));

  let i = 1;
  let mod = validSchedules[0].schedule;
  let time = validSchedules[0].offset;

  while (i < validSchedules.length) {
    if ((time + validSchedules[i].offset) % validSchedules[i].schedule === 0) {
      mod *= validSchedules[i].schedule;
      i++;
    } else {
      time += mod;
    }
  }

  const congruences = validSchedules.map(({ schedule, offset }) => [
    schedule,
    schedule - offset,
  ]);

  const result = crt(congruences);
  // return result;
  return time;
};

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA, 156);
console.log("Solution to part 2:", resultB, 404517869995362);
