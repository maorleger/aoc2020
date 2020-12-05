import { test, readInput } from "../utils/index";

const prepareInput = (rawInput: string) => rawInput.split("\r\n");

const input = prepareInput(readInput());

const calculateSeatID = (row) => {
  let minRow = 0;
  let maxRow = 127;
  let minCol = 0;
  let maxCol = 7;

  for (let letter of row) {
    let midRow = Math.floor(minRow + (maxRow - minRow) / 2);
    let midCol = Math.floor(minCol + (maxCol - minCol) / 2);
    switch (letter) {
      case "F":
        maxRow = midRow;
        break;
      case "B":
        minRow = midRow;
        break;
      case "L":
        maxCol = midCol;
        break;
      case "R":
        minCol = midCol;
        break;
    }
  }
  return maxRow * 8 + maxCol;

  // return parseInt(row.replace(/[BR]/g, "1").replace(/[FL]/g, "0"), 2);
};

const goA = (input) => {
  let maxSeat = 0;

  for (let row of input) {
    let seatID = calculateSeatID(row);
    maxSeat = Math.max(maxSeat, seatID);
  }
  return maxSeat;
};

const goB = (input) => {
  let allSeats = input.map(calculateSeatID);
  let minSeat = Math.min(...allSeats);
  let maxSeat = Math.max(...allSeats);
  let seriesSum = ((maxSeat - minSeat + 1) * (maxSeat + minSeat)) / 2;
  let allSeatSum = allSeats.reduce((acc, seatID) => acc + seatID);

  return seriesSum - allSeatSum;
};

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
