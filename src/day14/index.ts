import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";
import { values } from "lodash";

const prepareInput = (rawInput: string) => {
  let rows = rawInput.split(EOL);
  let groups = [];
  rows.forEach((row) => {
    let data = row.split(" = ");
    if (data[0] === "mask") {
      groups.push({ kind: "mask", value: data[1].split("") });
    } else {
      let address = /^mem\[(?<addr>\d+)\] = (?<val>\d+)$/.exec(row);
      groups.push({
        kind: "instruction",
        addr: parseInt(address.groups.addr).toString(2).padStart(36, "0").split(""),
        value: parseInt(address.groups.val).toString(2).padStart(36, "0").split(""),
      });
    }
  });
  return groups;
};

const input = prepareInput(readInput());

const goA = (input) => {
  const applyBitmask = (value, bitmask) => {
    return value.map((v, i) => {
      if (bitmask[i] === "X") {
        return v;
      }
      return bitmask[i];
    });
  };
  let memory = _.fill(new Array(36), 0);
  let currentMask = "";
  input.forEach((row) => {
    if (row.kind === "mask") {
      currentMask = row.value;
    } else {
      let value = applyBitmask(row.value, currentMask);
      memory[parseInt(row.addr.join(""), 2)] = parseInt(value.join(""), 2);
    }
  });
  return memory.reduce((acc, n) => acc + n);
};

const goB = (input) => {
  // skipped
};

/* Tests */

// test()

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA, 15018100062885);
console.log("Solution to part 2:", resultB);
