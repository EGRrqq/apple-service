import { TestLogger } from "./TestLogger";
import { TestRunner } from "./TestRunner";
import type { ITestEntity } from "../model/ITestEntity";
import type { TReceived } from "../model/TReceived";

type TExpect<T> = (received: TReceived<T>) => { toBe: TToBe<T> };
type TToBe<T> = (expected: T) => void;

interface ITest<T> {
  expect: TExpect<T>;
}

export class Test<T> implements ITest<T> {
  #entity: Partial<ITestEntity<T>> = {};
  #input: TReceived<T> | undefined;

  constructor(name: string) {
    this.#entity.name = name;
  }

  expect: TExpect<T> = (rec) => {
    // Assign the received value to the input property
    this.#input = rec;

    return { toBe: this.#toBe };
  };

  #toBe: TToBe<T> = async (expected) => {
    // Set the expected value in the entity
    this.#entity.expected = expected;

    // Run the test and get the received value and duration
    const { received, duration } = await TestRunner.receivedWithDuration(
      this.#input
    );

    // Update the entity with the received value and duration
    this.#entity.received = received;
    this.#entity.duration = duration;

    // Log the test results
    await TestLogger.log<T>(this.#entity);
  };
}

