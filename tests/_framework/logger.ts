import type { ITestCallback } from "./model/ITestEntity";

interface ILogger {
  successFlag: boolean;
  logData: ITestCallback;
}

// text stuff
const whiteSpace = "   ";
const separator = "----------------------------------";
const greenText = (text: string) => `\x1b[42m${text}\x1b[0m`;
const boldText = (text: string) => `\x1b[1m${text}\x1b[0m`;

export const logger = ({ logData, successFlag }: ILogger) =>
  successFlag ? successLog(logData) : errorLog();

const successLog = ({ testEntity, duration }: ITestCallback) => {
  console.log(
    "\n",
    `${greenText("  ")}`,
    `${boldText("name")}: ${testEntity.name}`,
    "\n",
    `${whiteSpace}${boldText("path")}: ${__filename}`,
    "\n",
    `${whiteSpace}${boldText("time")}: ${duration.toFixed(4)} ms`,
    "\n\n ----------------------------------"
  );
};

const errorLog = () => {
  throw Error("pants down");
};
