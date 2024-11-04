import type { ITestEntity } from "../model/ITestEntity";

// text stuff
const whiteSpace = "   ";
const separator = "----------------------------------";
const greenText = (text: string) => `\x1b[42m${text}\x1b[0m`;
const boldText = (text: string) => `\x1b[1m${text}\x1b[0m`;

export class TestLogger {
  // Log the test results based on the success flag
  static log = async <T>(testEntity: ITestEntity<T>) =>
    this.#successFlag(testEntity)
      ? this.#successLog<T>(testEntity)
      : this.#errorLog();

  // Determine if the test was successful
  static #successFlag = <T>(e: ITestEntity<T>) => e.received === e.expected;

  // Log the success message
  static #successLog = <T>(e: ITestEntity<T>) => {
    console.log(
      "\n",
      `${greenText("  ")}`,
      `${boldText("name")}: ${e.name}`,
      "\n",
      `${whiteSpace}${boldText("path")}: ${__filename}`,
      "\n",
      `${whiteSpace}${boldText("time")}: ${e.duration.toFixed(4)} ms`,
      `\n\n ${separator}`
    );
  };

  // Log the error message
  static #errorLog = () => {
    throw Error("pants down");
  };
}

