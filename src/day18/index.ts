import { test, readInput } from "../utils/index";
import { EOL } from "os";
import * as _ from "lodash";

const prepareInput = (rawInput: string) => rawInput.split(EOL).map((row) => tokenize(row));

class Expression {
  private tokens: Token[];
  constructor(private part2 = false) {
    this.tokens = [];
  }

  preProcess(): void {
    // hacky but it works. At this point there are no parens
    // So I can preprocess the array by replacing all (lhs + rhs)
    // with the result of adding them together.
    let i = 0;
    while (i < this.tokens.length) {
      let currentToken = this.tokens[i];
      if (currentToken.kind === "operator" && currentToken.value === "+") {
        let [lhs, op, rhs] = this.tokens.splice(i - 1, 3);
        if (lhs.kind !== "number" || op.kind !== "operator" || rhs.kind !== "number") {
          throw new Error();
        }
        const opResult: Token = { kind: "number", value: op.operator(lhs.value, rhs.value) };
        this.tokens.splice(i - 1, 0, opResult);
      } else {
        i++;
      }
    }
  }

  evaluate(): Token {
    if (this.part2) {
      this.preProcess();
    }
    while (this.tokens.length >= 3) {
      let lhs = this.tokens.shift();
      let op = this.tokens.shift();
      let rhs = this.tokens.shift();

      if (lhs.kind !== "number" || op.kind !== "operator" || rhs.kind !== "number") {
        throw new Error();
      }
      this.tokens.unshift({ kind: "number", value: op.operator(lhs.value, rhs.value) });
    }
    return { kind: "number", value: (this.tokens[0] as any).value };
  }

  push(token: Token) {
    this.tokens.push(token);
  }
}

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

const evaluate = (exp: Token[], part2: boolean = false) => {
  let expressions = new Array<Expression>();
  expressions.push(new Expression(part2));

  let i = 0;
  while (i < exp.length) {
    switch (exp[i].kind) {
      case "lparen":
        expressions.push(new Expression(part2));
        break;
      case "rparen":
        let val = expressions.pop().evaluate();
        expressions[expressions.length - 1].push(val);
        break;
      default:
        expressions[expressions.length - 1].push(exp[i]);
        break;
    }
    i++;
  }
  let val = expressions[expressions.length - 1].evaluate();
  if (val.kind !== "number") {
    throw Error();
  }
  return val.value;
};

const goA = (input) => {
  return input.reduce((acc, expr) => acc + evaluate(expr), 0);
};

const goB = (input: Token[][]) => {
  return input.reduce((acc, expr) => acc + evaluate(expr, true), 0);
};

/* Tests */

// test()

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA, 131076645626);
console.log("Solution to part 2:", resultB, 109418509151782);
