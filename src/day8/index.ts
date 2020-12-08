import { test, readInput } from "../utils/index";
import { EOL } from "os";
import { exit } from "process";

const prepareInput = (rawInput: string) =>
  rawInput.split(EOL).map((row) => {
    let [op, arg] = row.split(" ");
    return {
      op,
      arg: parseInt(arg),
    };
  });

const input = prepareInput(readInput());

const goA = (input) => {
  let acc = 0;
  let ptr = 0;
  let visited = new Set<number>();
  while (ptr < input.length) {
    if (visited.has(ptr)) {
      return { finished: false, acc };
    }

    visited.add(ptr);
    switch (input[ptr].op) {
      case "acc":
        acc += input[ptr].arg;
        ptr++;
        break;
      case "jmp":
        ptr += input[ptr].arg;
        break;
      case "nop":
        ptr++;
        break;
    }
  }

  return { finished: true, acc };
};

const goB = (input) => {
  for (let i = 0; i < input.length; i++) {
    let originalOp = input[i].op;
    if (originalOp === "jmp" || originalOp === "nop") {
      input[i].op = originalOp === "jmp" ? "nop" : "jmp";
      let result = goA(input);
      if (result.finished) {
        return result.acc;
      }
      input[i].op = originalOp;
    }
  }
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
