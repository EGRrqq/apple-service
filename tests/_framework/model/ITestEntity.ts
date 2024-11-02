export interface ITestCallback {
  testEntity: ITestEntity;
  duration: number;
}

interface ITestEntity {
  name: string;
  entry: string;
  expect: string;
}
