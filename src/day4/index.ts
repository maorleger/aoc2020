import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => { 
  var pairs = rawInput.split("\r\n\r\n").map(chunk => chunk.split("\r\n").flatMap(row => row.split(" ")))
  var result = []
  for (let set of pairs) {
    var obj = {}
    for (let line of set) {
      let [k, v] = line.split(":");
      obj[k] = v
    }

    result.push(obj)
  }
  return result
}

const input = prepareInput(readInput())

const goA = (input) => {
  return input.filter(
    (record) =>
      Object.keys(record).length === 8 ||
      (Object.keys(record).length === 7 && record.cid === undefined)
  ).length;
};

const goB = (input) => {
  let rules = {
    "byr": (byr) => byr.length === 4 && parseInt(byr) >= 1920 && parseInt(byr) <= 2002,
    "iyr": (iyr) => iyr.length === 4 && parseInt(iyr) >= 2010 && parseInt(iyr) <= 2020,
    "eyr": (eyr) => eyr.length === 4 && parseInt(eyr) >= 2020 && parseInt(eyr) <= 2030,
    "hgt": (hgt) => {
      let result = /^(?<num>\d+)(?<msr>[a-z]{2}$)/.exec(hgt);
      let isValid = false
      if (result && result.groups) {
        let { num, msr } = result.groups
        if (msr === "cm") {
          isValid = parseInt(num) >= 150 && parseInt(num) <= 193
        } else if (msr === "in") {
          isValid = parseInt(num) >= 59 && parseInt(num) <= 76
        }
      }

      return isValid
    },
    "hcl": (hcl) => /^\#[a-f0-9]{6}$/.test(hcl),
    "ecl": (ecl) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(ecl) > -1,
    "pid": (pid) => /^[0-9]{9}$/.test(pid)
  }

  return input.filter((record: { [x: string]: any; cid?: any }) => {
    let isValid = 
        Object.keys(record).length === 8 ||
        (Object.keys(record).length === 7 && record.cid === undefined);

    for (let key in rules) {
      isValid = isValid && rules[key](record[key])
    }
    return isValid
  }).length;
};

/* Tests */

test(1, 1);

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
