import type { ITestEntity } from "../model/ITestEntity";

// text stuff
const whiteSpace = "   ";
const separator = "----------------------------------";
const greenText = (text: string) => `\x1b[42m${text}\x1b[0m`;
const redText = (text: string) => `\x1b[41m${text}\x1b[0m`;
const boldText = (text: string) => `\x1b[1m${text}\x1b[0m`;

interface ILog<T> {
  testEntity: ITestEntity<T>;
  successFlag: boolean;
  errMsg: string;
}

export class TestLogger {
  // Log the test results based on the success flag
  static log = async <T>({ testEntity, successFlag, errMsg }: ILog<T>) => {
    if (!successFlag) {
      await this.#errorLog(testEntity);
      throw Error(errMsg);
    }

    await this.#successLog<T>(testEntity);
  };

  // Log the success message
  static #successLog = async <T>(e: ITestEntity<T>) => {
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
  static #errorLog = async <T>(e: ITestEntity<T>) => {
    console.log(
      "\n",
      `${redText("  ")}`,
      `${boldText("name")}: ${e.name}`,
      "\n",
      `${whiteSpace}${boldText("path")}: ${__filename}`,
      "\n",
      `${whiteSpace}${boldText("time")}: ${e.duration.toFixed(4)} ms`,
      "\n",
      `${whiteSpace}${boldText("expected")}: ${e.expected}`,
      "\n",
      `${whiteSpace}${boldText("received")}: ${e.received}`,
      `\n\n ${separator}`
    );
  };
}

