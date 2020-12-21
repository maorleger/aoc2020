import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";

type Data = {
  allergens: { [key: string]: string[] };
  counts: { [key: string]: number };
};

const prepareInput = (rawInput: string): Data => {
  let rows = rawInput.split(EOL);
  let allAllergens: { [s: string]: string[][] } = {};
  let allIngredients = [];
  rows.forEach((row) => {
    let [ingredients, allergens] = row.replace(")", "").split(" (contains ");
    allergens.split(", ").forEach((allergen) => {
      if (!allAllergens[allergen]) {
        allAllergens[allergen] = [];
      }
      allAllergens[allergen].push(ingredients.split(" "));
    });
    allIngredients.push(...ingredients.split(" "));
  });

  // Reduce the list of allergens to a single ingredient per allergen
  let matchedAllergens: { [s: string]: string[] } = {};
  for (let key in allAllergens) {
    let possible = _.intersection(...allAllergens[key]);
    matchedAllergens[key] = possible;
  }
  while (Object.values(matchedAllergens).some((v) => v.length > 1)) {
    for (let k in matchedAllergens) {
      if (matchedAllergens[k].length === 1) {
        for (let j in matchedAllergens) {
          if (k !== j) {
            matchedAllergens[j] = matchedAllergens[j].filter((v) => v !== matchedAllergens[k][0]);
          }
        }
      }
    }
  }

  return { allergens: matchedAllergens, counts: _.countBy(allIngredients) };
};

const input = prepareInput(readInput());

const goA = ({ allergens, counts }: Data) => {
  let result = 0;
  let allMatches = Object.values(allergens).flat(2);
  for (let ingredient in counts) {
    if (!allMatches.includes(ingredient)) {
      result += counts[ingredient];
    }
  }
  return result;
};

const goB = ({ allergens }: Data) =>
  _.sortBy(allergens, (k, v) => k)
    .reduce((acc, k) => acc.concat(k))
    .join(",");

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA, 2287);
console.log("Solution to part 2:", resultB, "fntg,gtqfrp,xlvrggj,rlsr,xpbxbv,jtjtrd,fvjkp,zhszc");
