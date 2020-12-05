import { test, readInput } from "../utils/index";

const prepareInput = (rawInput: string) => rawInput.split("\r\n");

const input = prepareInput(readInput());

const calculateSeatID = (row: string) => {
  // Byron's clever solution (previous commit has my binary search)
  return parseInt(row.replace(/[BR]/g, "1").replace(/[FL]/g, "0"), 2);
};

const goA = (input: string[]) => {
  let maxSeat = 0;

  for (let row of input) {
    let seatID = calculateSeatID(row);
    maxSeat = Math.max(maxSeat, seatID);
  }
  return maxSeat;
};

const goB = (input: string[]) => {
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
