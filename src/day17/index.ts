import { readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";
import { exit } from "process";

const toKey = (x: number, y: number, z: number, w: number = 0) => [x, y, z, w].join(":");
const fromKey = (key: string) => {
  let [x, y, z, w] = key.split(":");
  return [parseInt(x), parseInt(y), parseInt(z), parseInt(w)];
};

const prepareInput = (rawInput: string): Set<string> => {
  const coords = new Set<string>();

  rawInput.split(EOL).forEach((row, i) => {
    row.split("").forEach((val, j) => {
      if (val === "#") {
        coords.add(toKey(i, j, 0, 0));
      }
    });
  });

  return coords;
};
const input = prepareInput(readInput());

const goA = (coords: Set<string>) => {
  const bounds = (coords: Set<string>): number[] => {
    let coordObj = [...coords].map(fromKey);
    return [
      _.minBy(coordObj, (coord) => coord[0])[0] - 1,
      _.minBy(coordObj, (coord) => coord[1])[1] - 1,
      _.minBy(coordObj, (coord) => coord[2])[2] - 1,
      _.maxBy(coordObj, (coord) => coord[0])[0] + 1,
      _.maxBy(coordObj, (coord) => coord[1])[1] + 1,
      _.maxBy(coordObj, (coord) => coord[2])[2] + 1,
    ];
  };

  const numLiveNeighbors = (x: number, y: number, z: number, coords: Set<string>) => {
    let numAlive = 0;
    for (let x1 = -1; x1 <= 1; x1++) {
      for (let y1 = -1; y1 <= 1; y1++) {
        for (let z1 = -1; z1 <= 1; z1++) {
          if (x1 === 0 && y1 === 0 && z1 === 0) {
            continue;
          }
          if (coords.has(toKey(x + x1, y + y1, z + z1))) {
            numAlive++;
          }
        }
      }
    }

    return numAlive;
  };

  const round = (coords: Set<string>): Set<string> => {
    let newCoords = new Set<string>();
    let [minX, minY, minZ, maxX, maxY, maxZ] = bounds(coords);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          let numAlive = numLiveNeighbors(x, y, z, coords);
          if (numAlive === 3 || (numAlive === 2 && coords.has(toKey(x, y, z)))) {
            newCoords.add(toKey(x, y, z));
          }
        }
      }
    }

    return newCoords;
  };

  for (let i = 0; i < 6; i++) {
    coords = round(coords);
  }

  return coords.size;
};

const goB = (coords: Set<string>) => {
  const bounds = (coords: Set<string>): number[] => {
    let coordObj = [...coords].map(fromKey);
    return [
      _.minBy(coordObj, (coord) => coord[0])[0] - 1,
      _.minBy(coordObj, (coord) => coord[1])[1] - 1,
      _.minBy(coordObj, (coord) => coord[2])[2] - 1,
      _.minBy(coordObj, (coord) => coord[3])[3] - 1,
      _.maxBy(coordObj, (coord) => coord[0])[0] + 1,
      _.maxBy(coordObj, (coord) => coord[1])[1] + 1,
      _.maxBy(coordObj, (coord) => coord[2])[2] + 1,
      _.maxBy(coordObj, (coord) => coord[3])[3] + 1,
    ];
  };

  const numLiveNeighbors = (x: number, y: number, z: number, w: number, coords: Set<string>) => {
    let numAlive = 0;
    for (let x1 = -1; x1 <= 1; x1++) {
      for (let y1 = -1; y1 <= 1; y1++) {
        for (let z1 = -1; z1 <= 1; z1++) {
          for (let w1 = -1; w1 <= 1; w1++) {
            if (x1 === 0 && y1 === 0 && z1 === 0 && w1 === 0) {
              continue;
            }
            if (coords.has(toKey(x + x1, y + y1, z + z1, w + w1))) {
              numAlive++;
            }
          }
        }
      }
    }

    return numAlive;
  };

  const round = (coords: Set<string>): Set<string> => {
    let newCoords = new Set<string>();
    let [minX, minY, minZ, minW, maxX, maxY, maxZ, maxW] = bounds(coords);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          for (let w = minW; w <= maxW; w++) {
            let numAlive = numLiveNeighbors(x, y, z, w, coords);
            if (numAlive === 3 || (numAlive === 2 && coords.has(toKey(x, y, z, w)))) {
              newCoords.add(toKey(x, y, z, w));
            }
          }
        }
      }
    }

    return newCoords;
  };

  for (let i = 0; i < 6; i++) {
    coords = round(coords);
  }

  return coords.size;
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
