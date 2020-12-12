import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";

const prepareInput = (rawInput: string) =>
  rawInput.split(EOL).map((row) => {
    let { direction, value } = /(?<direction>[A-Z])(?<value>\d+)/.exec(
      row
    ).groups;
    return {
      direction,
      value: parseInt(value),
    };
  });

const input = prepareInput(readInput());

const goA = (input) => {
  let ship = {
    x: 0,
    y: 0,
    direction: 90,
  };

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
        ship.direction -= value;
        break;
      case "R":
        ship.direction += value;
        break;
      case "F":
        let angle = (ship.direction / 180) * Math.PI;

        ship.x += Math.sin(angle) * value;
        ship.y += Math.cos(angle) * value;
        break;
    }
  });
  return Math.abs(ship.x) + Math.abs(ship.y);
};

const goB = (input) => {
  let ship = {
    x: 0,
    y: 0,
  };

  let waypoint = {
    x: 10,
    y: 1,
  };

  function rotate(cx, cy, x, y, angle): { x: number; y: number } {
    var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * (x - cx) + sin * (y - cy) + cx,
      ny = cos * (y - cy) - sin * (x - cx) + cy;
    return { x: nx, y: ny };
  }

  input.forEach(({ direction, value }) => {
    // console.log(ship, waypoint);
    // console.log(direction, value);
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
        waypoint = rotate(ship.x, ship.y, waypoint.x, waypoint.y, -value);
        break;
      case "R":
        waypoint = rotate(ship.x, ship.y, waypoint.x, waypoint.y, value);
        break;
      case "F":
        let xDiff =
          waypoint.x > ship.x ? waypoint.x - ship.x : -(ship.x - waypoint.x);
        let yDiff =
          waypoint.y > ship.y ? waypoint.y - ship.y : -(ship.y - waypoint.y);
        // console.log(xDiff, yDiff);
        for (let i = 0; i < value; i++) {
          ship.x += xDiff;
          ship.y += yDiff;
        }
        waypoint.x = ship.x + xDiff
        waypoint.y = ship.y + yDiff
        break;
    }
    // console.log(ship, waypoint);
    // console.log("----------------");
  });
  return Math.abs(ship.x) + Math.abs(ship.y);
};

/* Tests */

// test()

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA, 998);
console.log("Solution to part 2:", resultB, 71586);
