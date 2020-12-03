import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput.split("\r\n").map(line => line.split(""))

const input = prepareInput(readInput())

const goA = (input, right, down) => {
  let row = 0
  let col = 0
  let count = 0;

  while (row < input.length) {
    if (input[row][col] == "#") {
      count++
    }
    console.log(row, col)
    col = (col + right) % input[row].length

    row += down
  }
  return count
}

const goB = (input) => {
  return goA(input, 1, 1) * goA(input, 3, 1) * goA(input, 5, 1) * goA(input, 7, 1) * goA(input, 1, 2)
}


/* Tests */

test(1, 1)

/* Results */

console.time("Time")
const resultA = goA(input, 3, 1)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
