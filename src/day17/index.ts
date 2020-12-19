import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";
import { stat } from "fs";

const toKey = (x, y, z, val) => [x, y, z, val].join(":");
const fromKey = (key) => {
  let [x, y, z, val] = key.split(":");
  return [parseInt(x), parseInt(y), parseInt(z), val];
};

const prepareInput = (rawInput: string): Set<string> => {
  const coords = new Set<string>();

  rawInput.split(EOL).forEach((row, i) => {
    row.split("").forEach((val, j) => {
      coords.add(toKey(i, j, 0, val));
    });
  });

  return coords;
};
const input = prepareInput(readInput());

const goA = (coords: Set<string>) => {
  let newCoords = new Set<string>();

  coords.forEach((key) => {
    let [x, y, z, val] = fromKey(key);
    let numAlive = 0;
    for (let x1 = x - 1; x1 <= x + 1; x1++) {
      for (let y1 = y - 1; y1 <= y + 1; y1++) {
        for (let z1 = z - 1; z1 <= z + 1; z1++) {
          if (x === x1 && y === y1 && z === z1) {
            continue;
          }

          if (coords.has(toKey(x1, y1, z1, "#"))) {
            numAlive++;
          } else if (!coords.has(toKey(x1, y1, z1, "."))) {
            newCoords.add(toKey(x1, y1, z1, "."));
          }
        }
      }
    }

    if (val === "#") {
      if (numAlive === 3 || numAlive === 2) {
        newCoords.add(key);
      } else {
        newCoords.add(toKey(x, y, z, "."));
      }
    } else if (numAlive === 3) {
      newCoords.add(toKey(x, y, z, "#"));
    } else {
      newCoords.add(toKey(x, y, z, "."));
    }
  });

  coords = newCoords;
  console.log(coords);

  return coords.size;
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
