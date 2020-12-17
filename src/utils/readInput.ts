import { readFileSync } from "fs";
import * as getCallerFile from "get-caller-file";
import * as path from "path";

export const readInput = () => {
  const file = path.join(path.dirname(getCallerFile()), "input.txt");
  console.log(file);

  return readFileSync(file).toString();
};
