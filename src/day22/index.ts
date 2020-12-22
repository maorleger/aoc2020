import { readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";

const prepareInput = (rawInput: string): [number[], number[]] => {
  let [[_id, ...p1], [_id2, ...p2]] = rawInput
    .split(`${EOL}${EOL}`)
    .map((group) => group.split(EOL));

  return [p1.map((v) => parseInt(v)), p2.map((v) => parseInt(v))];
};

const calculateScore = (deck: number[]) => {
  return _.zip(deck, _.range(deck.length, 0)).reduce((acc, [a, b]) => {
    acc += a * b;
    return acc;
  }, 0);
};

const goA = (p1: number[], p2: number[]) => {
  while (p1.length > 0 && p2.length > 0) {
    let top1 = p1.shift();
    let top2 = p2.shift();
    if (top1 > top2) {
      p1.push(top1, top2);
    } else {
      p2.push(top2, top1);
    }
  }

  // compute the score
  let deck = p1.length > 0 ? p1 : p2;
  return calculateScore(deck);
};

const goB = (p1: number[], p2: number[]) => {
  const seenp1 = new Set<string>();
  const seenp2 = new Set<string>();

  while (p1.length > 0 && p2.length > 0) {
    if (seenp1.has(p1.join("")) && seenp2.has(p2.join(""))) {
      return { winner: 1, score: calculateScore(p1) };
    }
    seenp1.add(p1.join(""));
    seenp2.add(p2.join(""));

    let top1 = p1.shift();
    let top2 = p2.shift();

    let winner: number;
    if (p1.length >= top1 && p2.length >= top2) {
      const subGameResult = goB(p1.slice(0, top1), p2.slice(0, top2));
      winner = subGameResult.winner;
    } else if (top1 > top2) {
      winner = 1;
    } else {
      winner = 2;
    }

    if (winner === 1) {
      p1.push(top1, top2);
    } else {
      p2.push(top2, top1);
    }
  }

  if (p1.length > 0) {
    return { winner: 1, score: calculateScore(p1) };
  } else {
    return { winner: 2, score: calculateScore(p2) };
  }
};

console.time("Time");
const resultA = goA(...prepareInput(readInput()));
const resultB = goB(...prepareInput(readInput()));
console.timeEnd("Time");

console.log("Solution to part 1:", resultA, 32102);
console.log("Solution to part 2:", resultB.score, 34173);
