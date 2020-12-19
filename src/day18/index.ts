import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";

const prepareInput = (rawInput: string) => rawInput.split(EOL).map((row) => tokenize(row));

type Token =
  | { kind: "number"; value: number }
  | { kind: "lparen" }
  | { kind: "rparen" }
  | { kind: "operator"; operator: (v1, v2) => number; value: string };
const tokenize = (data: string) => {
  const tokens: Token[] = [];

  let currentToken = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] === " ") {
      continue;
    }

    // Handle numbers
    if (data[i].match(/\d/)) {
      currentToken.push(data[i]);
      continue;
    } else if (currentToken.length > 0) {
      tokens.push({ kind: "number", value: parseInt(currentToken.join("")) });
      currentToken = [];
    }

    // All other tokens
    switch (data[i]) {
      case "(":
        tokens.push({ kind: "lparen" });
        break;
      case ")":
        tokens.push({ kind: "rparen" });
        break;
      case "+":
        tokens.push({ kind: "operator", value: "+", operator: (v1, v2) => v1 + v2 });
        break;
      case "-":
        tokens.push({ kind: "operator", value: "-", operator: (v1, v2) => v1 - v2 });
        break;
      case "*":
        tokens.push({ kind: "operator", value: "*", operator: (v1, v2) => v1 * v2 });
        break;
      case "/":
        tokens.push({ kind: "operator", value: "/", operator: (v1, v2) => v1 / v2 });
        break;
      default:
        throw new Error(`Unknown token ${data[i]}`);
    }
  }
  if (currentToken.length > 0) {
    tokens.push({ kind: "number", value: parseInt(currentToken.join("")) });
  }
  return tokens;
};

const input = prepareInput(readInput());

const goA = (input) => {
  console.log(input);
  const evaluate = (exp: Token[]) => {
    let expressions: Token[] = [];

    let i = 0;
    while (i < exp.length) {
      switch (exp[i].kind) {
        case "lparen":
          let numOpeners = 1;
          i++;
          let subExpr: Token[] = [];
          while (numOpeners > 0) {
            if (exp[i].kind === "rparen") {
              numOpeners--;
              if (numOpeners > 0) {
                subExpr.push(exp[i]);
              }
            } else if (exp[i].kind === "lparen") {
              numOpeners++;
              subExpr.push(exp[i]);
            } else {
              subExpr.push(exp[i]);
            }
            i++;
          }
          console.log("subExp", subExpr, evaluate(subExpr));
          console.log("xpressions", expressions);
          expressions.unshift({ kind: "number", value: evaluate(subExpr) });
          break;
        default:
          expressions.push(exp[i]);
          break;
      }
      i++;
    }

    i = 0;
    // we evaluated all the subexpr, so we can go left to right now...
    while (expressions.length > 1) {
      console.log("stack", expressions);
      let lhs = expressions.shift();
      let op = expressions.shift();
      let rhs = expressions.shift();
      if (lhs.kind !== "number" || op.kind !== "operator" || rhs.kind !== "number") {
        throw new Error();
      }
      expressions.unshift({ kind: "number", value: op.operator(lhs.value, rhs.value) });
    }
    return expressions[0].kind === "number" && expressions[0].value;
  };
  return input.reduce((acc, expr) => acc + evaluate(expr), 0);
};

const goB = (input) => {
  return;
};

/* Tests */

// test()

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
