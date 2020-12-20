import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";

type Tile = {
  ID: number;
  image: string[][];
  edges: string[];
  neighbors: Tile[];
};

const prepareInput = (rawInput: string): Tile[] => {
  let tileData = rawInput.split(`${EOL}${EOL}`);
  let tiles = tileData.map((tile) => {
    let [header, ...rows] = tile.split(EOL);
    return {
      ID: parseInt(header.match(/\d+/)[0]),
      image: rows.map((row) => row.split("")),
      edges: [
        rows[0], // top edge
        rows.map((r) => r[r.length - 1]).join(""), // right column
        rows[rows.length - 1], // bottom edge
        rows.map((r) => r[0]).join(""),
      ],
      neighbors: [],
    };
  });
  return tiles;
};

const input = prepareInput(readInput());

const goA = (input: Tile[]) => {
  // corners will only have two matches....
  for (let i = 0; i < input.length; i++) {
    let currentTile = input[i];
    for (let j = 0; j < input.length; j++) {
      if (i == j) {
        continue;
      }

      if (
        currentTile.edges.some(
          (edge) =>
            input[j].edges.includes(edge) ||
            input[j].edges.includes(edge.split("").reverse().join(""))
        )
      ) {
        currentTile.neighbors.push(input[i]);
      }
    }
  }

  return input.reduce((acc, { ID, neighbors }) => {
    if (neighbors.length === 2) {
      return acc * ID;
    }
    return acc;
  }, 1);
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
