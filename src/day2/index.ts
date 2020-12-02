import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) : string[][] => {
  var parts = rawInput.split("\n").map(row => row.split(/[ :-]/)).map(row => row.filter(v => v !== ''))
  return parts
}

const input = prepareInput(readInput())

const goA = (input: string[][]) : number => 
  input.reduce((acc: number, line: string[]) => {
    let [ min, max, char, password ] = line
    let count = password.split("").filter(c => c === char).length

    if (count >= parseInt(min) && count <= parseInt(max)) {
      return acc + 1
    }
    return acc
  }, 0)

const goB = (input: string[][]) => 
  input.reduce((acc: number, line: string[]) => {
    let [ a, b, char, password ] = line
    let posA = parseInt(a) - 1
    let posB = parseInt(b) - 1

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