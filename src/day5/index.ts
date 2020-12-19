import { test, readInput } from "../utils/index";

const prepareInput = (rawInput: string) => rawInput.split("\r\n");

const input = prepareInput(readInput());

const calculateSeatID = (row: string) => {
  // Byron's solution (previous commit has my binary search)
  return parseInt(row.replace(/[BR]/g, "1").replace(/[FL]/g, "0"), 2);
};

const goA = (input: string[]) => {
  let maxSeat = 0;

  for (let seat of input) {
    let seatID = calculateSeatID(seat);
    maxSeat = Math.max(maxSeat, seatID);
  }
  return maxSeat;
};

const goB = (input: string[]) => {
  let minSeatID: number;
  let maxSeatID: number;
  let sumSeatIDs = 0;

  for (let seat of input) {
    let seatID = calculateSeatID(seat);
    minSeatID = Math.min(minSeatID || seatID, seatID);
    maxSeatID = Math.max(maxSeatID || seatID, seatID);
    sumSeatIDs += seatID;
  }
  let seriesSum = ((maxSeatID - minSeatID + 1) * (maxSeatID + minSeatID)) / 2;

  return seriesSum - sumSeatIDs;
};

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
