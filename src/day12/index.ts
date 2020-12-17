import { readInput } from "../utils/index";
import { EOL } from "os";

type Point = {
  x: number;
  y: number;
};

type Direction = {
  direction: "N" | "E" | "S" | "W" | "L" | "R" | "F";
  value: number;
};

const prepareInput = (rawInput: string) =>
  rawInput.split(EOL).map((row) => {
    let { direction, value } = /(?<direction>[A-Z])(?<value>\d+)/.exec(row).groups;
    return {
      direction,
      value: parseInt(value),
    } as Direction;
  });

const input = prepareInput(readInput());

const goA = (input: Direction[]) => {
  let ship: Point = {
    x: 0,
    y: 0,
  };
  let angle = 90;

  input.forEach(({ direction, value }) => {
    switch (direction) {
      case "N":
        ship.y += value;
        break;
      case "S":
        ship.y -= value;
        break;
      case "E":
        ship.x += value;
        break;
      case "W":
        ship.x -= value;
        break;
      case "L":
        angle -= value;
        break;
      case "R":
        angle += value;
        break;
      case "F":
        let radians = (angle / 180) * Math.PI;

        ship.x += Math.sin(radians) * value;
        ship.y += Math.cos(radians) * value;
        break;
    }
  });
  return Math.abs(ship.x) + Math.abs(ship.y);
};

const goB = (input: Direction[]) => {
  let ship: Point = {
    x: 0,
    y: 0,
  };

  let waypoint: Point = {
    x: 10,
    y: 1,
  };

  const rotate = (angle: number): Point => {
    let radians = (Math.PI / 180) * angle;
    let cos = Math.cos(radians);
    let sin = Math.sin(radians);
    let nx = cos * (waypoint.x - ship.x) + sin * (waypoint.y - ship.y) + ship.x;
    let ny = cos * (waypoint.y - ship.y) - sin * (waypoint.x - ship.x) + ship.y;
    return { x: nx, y: ny };
  };

  input.forEach(({ direction, value }) => {
    switch (direction) {
      case "N":
        waypoint.y += value;
        break;
      case "S":
        waypoint.y -= value;
        break;
      case "E":
        waypoint.x += value;
        break;
      case "W":
        waypoint.x -= value;
        break;
      case "L":
        waypoint = rotate(-value);
        break;
      case "R":
        waypoint = rotate(value);
        break;
      case "F":
        let xDiff = waypoint.x > ship.x ? waypoint.x - ship.x : -(ship.x - waypoint.x);
        let yDiff = waypoint.y > ship.y ? waypoint.y - ship.y : -(ship.y - waypoint.y);
        ship.x = ship.x + xDiff * value;
        ship.y = ship.y + yDiff * value;
        waypoint.x = ship.x + xDiff;
        waypoint.y = ship.y + yDiff;
        break;
    }
  });

  return Math.abs(ship.x) + Math.abs(ship.y);
};

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA, 998);
console.log("Solution to part 2:", resultB, 71586);
