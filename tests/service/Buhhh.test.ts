import type { ITestCallback } from "../_framework/model/ITestEntity";
import { test } from "../_framework/testRunner";

const buhhhEntity: ITestCallback["testEntity"] = {
  name: "testin error state, for logger",
  entry: "buhhh",
  expect: "3",
};

test(async () => buhhhEntity);
