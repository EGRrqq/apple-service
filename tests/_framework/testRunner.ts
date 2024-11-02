import type { ITestCallback } from "./model/ITestEntity";
import { logger } from "./logger";

type TCallback = () => Promise<ITestCallback["testEntity"]>;
type TCalcTime = (callback: TCallback) => Promise<{
  duration: number;
  testEntity: Awaited<ReturnType<TCallback>>;
}>;

const testEntityWithDuration: TCalcTime = async (callback) => {
  // Record start time
  const startTime = performance.now();
  // Run test callback
  const testEntity = await callback();
  // Record end time
  const endTime = performance.now();
  // Calc duration
  const duration = endTime - startTime;

  return { testEntity, duration };
};

// possible move to a separate class
export const test = async (callback: TCallback) => {
  const callbackData = await testEntityWithDuration(callback);

  // Define test flag
  const successFlag =
    callbackData.testEntity.entry === callbackData.testEntity.expect;

  logger({ logData: callbackData, successFlag });
};
