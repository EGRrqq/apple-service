import { TestLogger } from "./TestLogger";
import { TestRunner } from "./TestRunner";
import type { ITestEntity } from "../model/ITestEntity";
import type { TReceived } from "../model/TReceived";
import type { PartialRequired } from "../utils/PartialRequired";
import { isProp } from "../utils/IsProp";

type TExpect<T> = (received: TReceived<T>) => { toBe: TToBe<T> };
type TToBe<T> = (expected: T) => void;

interface ITest<T> {
  expect: TExpect<T>;
}

export class Test<T> implements ITest<T> {
  #entity: PartialRequired<ITestEntity<T>> = {
    name: undefined,
    expected: undefined,
    received: undefined,
    duration: undefined,
  };
  #input: TReceived<T> | undefined;

  constructor(name: string) {
    // Update the entity with the name value
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

    // Check if input prop is assigned
    isProp<TReceived<T>>(this.#input, "input");

    // Run the test and get the received value and duration
    const { received, duration } = await TestRunner.receivedWithDuration<T>(
      this.#input
    );

    // Update the entity with the received value and duration
    this.#entity.received = received;
    this.#entity.duration = duration;

    // Check if entity props are assigned
    this.#isEntity(this.#entity);

    // Log the test results
    await TestLogger.log<T>(this.#entity);
  };

  // Ensure all entity properties are assigned
  #isEntity(entity: Partial<ITestEntity<T>>): asserts entity is ITestEntity<T> {
    for (const key in entity)
      isProp(this.#entity[key as keyof typeof entity], key);
  }
}

