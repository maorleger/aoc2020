import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";

class Cup {
  next?: Cup;
  prev?: Cup;
  constructor(public id: number) {}
}

const prepareInput = (rawInput: string): { head: Cup; cups: Map<number, Cup> } => {
  const ids = rawInput.split("").map((id) => parseInt(id));
  let fakeCup = new Cup(-1);
  let current = fakeCup;
  let cups = new Map<number, Cup>();

  for (let id of ids) {
    current.next = new Cup(id);
    cups[id] = current.next;
    current.next.prev = current;
    current = current.next;
  }
  current.next = fakeCup.next;
  fakeCup.next.prev = current;
  // Like an LRU cache (doubly-linked list + hashmap) for constant time operations
  return { head: fakeCup.next, cups };
};

const rawInput = readInput();

const move = (current: Cup, maxID: number, cups: Map<number, Cup>) => {
  let startCup = current.next;
  let endCup = startCup.next.next;

  // sever existing ties
  current.next = endCup.next;
  endCup.next.prev = current;

  const pickedCups = [startCup.id, startCup.next.id, startCup.next.next.id];

  let destinationId = current.id;
  while (destinationId === current.id || pickedCups.includes(destinationId)) {
    destinationId--;
    if (destinationId === 0) {
      destinationId = maxID;
    }
  }

  // now we have a destination to rebuild the ties
  const destination = cups[destinationId];
  endCup.next = destination.next;
  destination.next.prev = endCup;
  destination.next = startCup;
  startCup.prev = destination;
};

const goA = ({ head, cups }: { head: Cup; cups: Map<number, Cup> }) => {
  let maxID: number = 9;

  let current = head;
  for (let i = 0; i < 100; i++) {
    move(current, maxID, cups);
    current = current.next;
  }

  current = cups[1];
  const cupIDs = [];
  current = current.next;
  while (current.id !== 1) {
    cupIDs.push(current.id);
    current = current.next;
  }
  return cupIDs.join("");
};

const goB = ({ head, cups }: { head: Cup; cups: Map<number, Cup> }) => {
  let maxID: number = 1000000;

  let current = head.prev;

  // add the rest of the nodes
  for (let i = 10; i <= 1000000; i++) {
    current.next = new Cup(i);
    cups[i] = current.next;
    current.next.prev = current;
    current = current.next;
  }
  current.next = head;
  head.prev = current;

  current = head;
  for (let i = 0; i < 10000000; i++) {
    move(current, maxID, cups);
    current = current.next;
  }

  current = cups[1];
  console.log(current.next.id, current.next.next.id);
  return current.next.id * current.next.next.id;
};

console.time("Time");
const resultA = goA(prepareInput(rawInput));
const resultB = goB(prepareInput(rawInput));
console.timeEnd("Time");

console.log("Solution to part 1:", resultA, 28946753);
console.log("Solution to part 2:", resultB, 519044017360);
