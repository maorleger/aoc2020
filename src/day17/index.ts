import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";
import { stat } from "fs";

const prepareInput = (rawInput: string): {} => {
  return Object.fromEntries(
    rawInput.split(EOL).flatMap((row, i) => {
      return row.split("").map((val, j) => [[i, j, 0].join(""), val]);
    })
  );
};
const input = prepareInput(readInput());

const goA = (state: {}) => {
  const fromKey = (key) => key.split(":").map((i) => parseInt(i));
  const toKey = (...coords) => coords.join(":");
  console.log(state);
  for (let i = 0; i < 6; i++) {
    console.log("round", i);
    console.log(state);
    let newState = JSON.parse(JSON.stringify(state));
    for (let k in state) {
      let [x, y, z] = fromKey(k);
      let numAlive = 0;
      for (let x1 = x - 1; x1 <= x + 1; x1++) {
        for (let y1 = y - 1; y1 <= y + 1; y1++) {
          for (let z1 = z - 1; z1 <= z + 1; z1++) {
            if ([x, y, z] === [x1, y1, z1]) {
              continue;
            }
            // add the neighbor if it doesnt exist
            if (!state[toKey(x1, y1, z1)]) {
              console.log("adding new state");
              newState[toKey(x1, y1, z1)] = ".";
            }
            if (state[toKey(x1, y1, z1)] === "#") {
              numAlive++;
            }
          }
        }
      }

      if (state[toKey(x, y, z)] === "#" && numAlive !== 2 && numAlive !== 3) {
        newState[toKey(x, y, z)] = ".";
      }
      if (state[toKey(x, y, z)] === "." && numAlive === 3) {
        newState[toKey(x, y, z)] = "#";
      }
    }
    state = newState;
  }

  let result = 0;
  console.log(state);
  return Object.values(state).reduce((acc: number, v: string) => {
    if (v === "#") {
      return acc + 1;
    }
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
