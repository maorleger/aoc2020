import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";
import { identity, stubObject } from "lodash";

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
    .filter((it) => !isNaN(it))
    .map((id) => {
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
    .sort((a, b) => a.wait - b.wait);
  return earliestTimes[0].id * earliestTimes[0].wait;
};

// Not my solution
const goB = ({ schedules }) => {
  let validSchedules = schedules
    .map((schedule, offset) => ({ schedule, offset }))
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

  return time;
};

/* Tests */

// test()

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA, 156);
console.log("Solution to part 2:", resultB, 404517869995362);
