import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";

const prepareInput = (rawInput: string): Set<string> => {
  const tiles = new Set<string>();
  const rows = rawInput.split(EOL).map((row) => {
    const directions = [];
    let i = 0;
    while (i < row.length) {
      if (row[i] === "n" || row[i] === "s") {
        directions.push(row.slice(i, i + 2));
        i++;
      } else {
        directions.push(row[i]);
      }
      i++;
    }
    return directions;
  });
  for (let directions of rows) {
    let coords = [0, 0];
    for (let direction of directions) {
      switch (direction) {
        case "nw":
          coords = [coords[0] - 1, coords[1] - 1];
          break;
        case "ne":
          coords = [coords[0] + 1, coords[1] - 1];
          break;
        case "sw":
          coords = [coords[0] - 1, coords[1] + 1];
          break;
        case "se":
          coords = [coords[0] + 1, coords[1] + 1];
          break;
        case "e":
          coords = [coords[0] + 2, coords[1]];
          break;
        case "w":
          coords = [coords[0] - 2, coords[1]];
          break;
      }
    }

    const coordKey = coords.join(":");
    if (tiles.has(coordKey)) {
      tiles.delete(coordKey);
    } else {
      tiles.add(coordKey);
    }
  }

  return tiles;
};

const rawInput = readInput();

const goA = (input) => {
  return input.size;
};

const goB = (tiles) => {
  const bounds = (tiles: Set<string>): [number, number, number, number] => {
    let tileCoords = [...tiles].map((tile) => tile.split(":").map((x) => parseInt(x)));
    return [
      _.minBy(tileCoords, ([x, y]) => x)[0] - 1,
      _.maxBy(tileCoords, ([x, y]) => x)[0] + 1,
      _.minBy(tileCoords, ([x, y]) => y)[1] - 1,
      _.maxBy(tileCoords, ([x, y]) => y)[1] + 1,
    ];
  };

  const numBlackNeighbors = (x: number, y: number, tiles: Set<string>) => {
    let neighborOffsets = [
      [2, 0],
      [1, 1],
      [-1, 1],
      [-2, 0],
      [-1, -1],
      [1, -1],
    ];
    let numBlack = 0;
    for (let [x1, y1] of neighborOffsets) {
      if (tiles.has([x + x1, y + y1].join(":"))) {
        numBlack++;
      }
    }
    return numBlack;
  };

  const play = (tiles: Set<string>): Set<string> => {
    let newTiles = new Set<string>();
    const [minX, maxX, minY, maxY] = bounds(tiles);
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        let key = [x, y].join(":");
        let numBlack = numBlackNeighbors(x, y, tiles);
        if (numBlack === 2 && !tiles.has(key)) {
          newTiles.add(key);
        } else if (tiles.has(key) && (numBlack === 1 || numBlack === 2)) {
          newTiles.add(key);
        }
      }
    }

    return newTiles;
  };

  for (let i = 0; i < 100; i++) {
    tiles = play(tiles);
  }

  return tiles.size;
};

console.time("Time");
const resultA = goA(prepareInput(rawInput));
const resultB = goB(prepareInput(rawInput));
console.timeEnd("Time");

console.log("Solution to part 1:", resultA, 386);
console.log("Solution to part 2:", resultB, 4214);
