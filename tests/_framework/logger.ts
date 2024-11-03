import type { ITestEntity } from "./model/ITestEntity";

interface ILogger<T> {
  successFlag: boolean;
  logData: ITestEntity<T>;
}

// text stuff
const whiteSpace = "   ";
const separator = "----------------------------------";
const greenText = (text: string) => `\x1b[42m${text}\x1b[0m`;
const boldText = (text: string) => `\x1b[1m${text}\x1b[0m`;

export const logger = async <T>({ logData, successFlag }: ILogger<T>) =>
  successFlag ? successLog<T>(logData) : errorLog();

const successLog = <T>(e: ITestEntity<T>) => {
  console.log(
    "\n",
    `${greenText("  ")}`,
    `${boldText("name")}: ${e.name}`,
    "\n",
    `${whiteSpace}${boldText("path")}: ${__filename}`,
    "\n",
    `${whiteSpace}${boldText("time")}: ${e.duration.toFixed(4)} ms`,
    "\n\n ----------------------------------"
  );
};

const errorLog = () => {
  throw Error("pants down");
};
