import { logger } from "./logger";
import type { ITestEntity } from "./model/ITestEntity";

// define async or not async callback
type TCallback<T> = () => Promise<T> | T;
type TReceived<T> = TCallback<T> | T;

type TExpect<T> = (received: TReceived<T>) => { toBe: TToBe<T> };
type TToBe<T> = (expected: T) => void;

type TReceivedWithDuration<T> = (received: TReceived<T>) => Promise<{
  received: T;
  duration: number;
}>;

interface ITest<T> {
  expect: TExpect<T>;
}

export class Test<T> implements ITest<T> {
  #entity: ITestEntity<T> = {};
  #input: TReceived<T>;

  constructor(name: string) {
    this.#entity.name = name;
  }

  expect: TExpect<T> = (rec) => {
    // run timed test callback
    this.#input = rec;

    return { toBe: this.#toBe };
  };

  #toBe: TToBe<T> = async (expected) => {
    // set expected prop
    this.#entity.expected = expected;

    // -----------
    // i want the async func to be the last one.
    // so I perform all calculations
    // in the last function

    const { received, duration } = await this.#receivedWithDuration(
      this.#input
    );

    // set test func props
    this.#entity.received = received;
    this.#entity.duration = duration;

    // Define test flag
    const successFlag = this.#entity.received === this.#entity.expected;

    await logger({ logData: this.#entity, successFlag });
  };

  #receivedWithDuration: TReceivedWithDuration<T> = async (rec) => {
    // Record start time
    const startTime = performance.now();
    // Run test callback

    let received: T;

    if (this.#isTCallback(rec)) {
      // If rec is a function, call it and await the result if it's a promise
      received = await rec();
    } else {
      // If rec is not a function, it's a value, so just assign it
      received = rec;
    }

    // Record end time
    const endTime = performance.now();
    // Calc duration
    const duration = endTime - startTime;

    return { received, duration };
  };

  // Type guard to check if rec is a TCallback<T>
  #isTCallback<T>(rec: TReceived<T>): rec is TCallback<T> {
    return typeof rec === "function";
  }
}
