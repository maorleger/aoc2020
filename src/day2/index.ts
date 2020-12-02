import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) : Array<{ [key: string] : string }> => {
  return rawInput.split("\n").map(row => {
    const { groups } = /(?<min>\d+)-(?<max>\d+) (?<char>.): (?<password>.*)/.exec(row)
    return groups
  })
}

const input = prepareInput(readInput())

const goA = (input: Array<{ [key: string] : string }>) : number => 
  input.reduce((acc: number, { min, max, char, password }) => {
    let count = password.split("").filter(c => c === char).length

    if (count >= parseInt(min) && count <= parseInt(max)) {
      return acc + 1
    }
    return acc
  }, 0)

const goB = (input: Array<{ [key: string] : string }>) => 
  input.reduce((acc: number, { min, max, char, password }) => {
    let posA = parseInt(min) - 1
    let posB = parseInt(max) - 1

    if ((password[posA] === char && password[posB] !== char) || (password[posA] !== char && password[posB] === char)) {
      return acc + 1
    }

    return acc
  }, 0)

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);