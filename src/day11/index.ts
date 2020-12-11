import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";
import { forEach } from "lodash";

const prepareInput = (rawInput: string) =>
  rawInput.split(EOL).map((row) => row.split(""));

const input = prepareInput(readInput());

const goA = (seats: string[][]) => {
  let calculate = (row: number, col: number, seats: string[][]): string => {
    const neighbors = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    let numTaken = neighbors.reduce((acc, [nRow, nCol]) => {
      nRow = row + nRow;
      nCol = col + nCol;
      if (seats[nRow] && seats[nRow][nCol] === "#") {
        acc += 1;
      }

      return acc;
    }, 0);
    if (seats[row][col] === "L" && numTaken === 0) {
      return "#";
    } else if (seats[row][col] === "#" && numTaken >= 4) {
      return "L";
    } else {
      return seats[row][col];
    }
  };

  var run = true;
  while (run) {
    run = false;
    let nextSeats = JSON.parse(JSON.stringify(seats));
    for (let row = 0; row < seats.length; row++) {
      for (let col = 0; col < seats[row].length; col++) {
        nextSeats[row][col] = calculate(row, col, seats);
        if (seats[row][col] !== nextSeats[row][col]) {
          run = true;
        }
      }
    }
    seats = nextSeats;
  }

  return seats.flat().reduce((acc, seat) => {
    if (seat === "#") {
      acc++;
    }
    return acc;
  }, 0);
};

const goB = (seats) => {
  let calculate = (row: number, col: number, seats: string[][]): string => {
    const neighbors = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    let numTaken = 0;
    neighbors.forEach(([i, j]) => {
      let nRow = row + i;
      let nCol = col + j;

      while (seats[nRow] && seats[nRow][nCol] === ".") {
        nRow += i;
        nCol += j;
      }

      if (seats[nRow] && seats[nRow][nCol] === "#") {
        numTaken++;
      }
    });
    if (seats[row][col] === "L" && numTaken === 0) {
      return "#";
    } else if (seats[row][col] === "#" && numTaken >= 5) {
      return "L";
    } else {
      return seats[row][col];
    }
  };

  var run = true;
  while (run) {
    run = false;
    let nextSeats = JSON.parse(JSON.stringify(seats));
    for (let row = 0; row < seats.length; row++) {
      for (let col = 0; col < seats[row].length; col++) {
        nextSeats[row][col] = calculate(row, col, seats);
        if (seats[row][col] !== nextSeats[row][col]) {
          run = true;
        }
      }
    }
    seats = nextSeats;
  }

  return seats.flat().reduce((acc, seat) => {
    if (seat === "#") {
      acc++;
    }
    return acc;
  }, 0);
};

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
