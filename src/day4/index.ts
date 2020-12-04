import { test, readInput } from "../utils/index";

const prepareInput = (rawInput: string) => {
  return rawInput.split("\r\n\r\n").map((record) => {
    let pairs = record.split(/\r\n| /g).map((pair) => pair.split(":"));
    return Object.fromEntries(pairs);
  });
};

const input = prepareInput(readInput());

const goA = (input: Array<{ cid?: string }>) => {
  return input.filter(
    (record) =>
      Object.keys(record).length === 8 ||
      (Object.keys(record).length === 7 && record.cid === undefined)
  ).length;
};

const goB = (input: Array<{}>) => {
  let rules = {
    byr: (byr: string) =>
      byr.length === 4 && parseInt(byr) >= 1920 && parseInt(byr) <= 2002,
    iyr: (iyr: string) =>
      iyr.length === 4 && parseInt(iyr) >= 2010 && parseInt(iyr) <= 2020,
    eyr: (eyr: string) =>
      eyr.length === 4 && parseInt(eyr) >= 2020 && parseInt(eyr) <= 2030,
    hgt: (hgt: string) => {
      let result = /^(?<num>\d+)(?<msr>[a-z]{2}$)/.exec(hgt);
      let isValid = false;
      if (result && result.groups) {
        let { num, msr } = result.groups;
        if (msr === "cm") {
          isValid = parseInt(num) >= 150 && parseInt(num) <= 193;
        } else if (msr === "in") {
          isValid = parseInt(num) >= 59 && parseInt(num) <= 76;
        }
      }

      return isValid;
    },
    hcl: (hcl: string) => /^\#[a-f0-9]{6}$/.test(hcl),
    ecl: (ecl: string) =>
      ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(ecl) > -1,
    pid: (pid: string) => /^[0-9]{9}$/.test(pid),
  };

  return input.filter((record: { cid?: any }) => {
    let isValid =
      Object.keys(record).length === 8 ||
      (Object.keys(record).length === 7 && record.cid === undefined);

    for (let key in rules) {
      isValid = isValid && rules[key](record[key]);
    }
    return isValid;
  }).length;
};

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
