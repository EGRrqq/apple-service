export interface ITestEntity<T> {
  name: string;
  received: T;
  expected: T;
  duration: number;
}

