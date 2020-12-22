import { readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";

const prepareInput = (rawInput: string) =>
  rawInput.split(`${EOL}${EOL}`).reduce((acc, group) => {
    let [player, ...cards] = group.split(EOL);
    acc[player.slice(7, 8)] = cards.map((card) => parseInt(card));
    return acc;
  }, {});

const goA = (input: { [k: string]: number[] }) => {
  while (Object.values(input).every((c) => c.length > 0)) {
    let top1 = input["1"].shift();
    let top2 = input["2"].shift();
    if (top1 > top2) {
      input["1"].push(top1, top2);
    } else {
      input["2"].push(top2, top1);
    }
  }

  // compute the score
  let deck = input["1"].length > 0 ? input["1"] : input["2"];
  return calculateScore(deck);
};

const calculateScore = (deck: number[]) => {
  return _.zip(deck, _.range(deck.length, 0)).reduce((acc, [a, b]) => {
    acc += a * b;
    return acc;
  }, 0);
};

const goB = (decks: { [k: string]: number[] }) => {
  const seenDecks = new Set<string>();
  while (Object.values(decks).every((c) => c.length > 0)) {
    if (seenDecks.has([...decks["1"], ...decks["2"]].join(""))) {
      return { winner: "1", score: calculateScore(decks["1"]) };
    }
    seenDecks.add([...decks["1"], ...decks["2"]].join(""));

    let top1 = decks["1"].shift();
    let top2 = decks["2"].shift();

    let winner;
    if (decks["1"].length >= top1 && decks["2"].length >= top2) {
      const subGameResult = goB(_.cloneDeep(decks));
      winner = subGameResult.winner;
    } else if (top1 > top2) {
      winner = "1";
    } else {
      winner = "2";
    }

    const order = winner === "1" ? [top1, top2] : [top2, top1];
    decks[winner].push(...order);
  }

  // compute the score
  let winner = decks["1"].length > 0 ? "1" : "2";
  let deck = decks[winner];
  return { winner, score: calculateScore(deck) };
};

/* Tests */

// test()

/* Results */

console.time("Time");
const resultA = goA(prepareInput(readInput()));
const resultB = goB(prepareInput(readInput()));
console.timeEnd("Time");

console.log("Solution to part 1:", resultA, 32102);
console.log("Solution to part 2:", resultB);
