import type {
  TCallback,
  TReceived,
  TReceivedWithDuration,
} from "../model/TReceived";

export class TestRunner {
  static async receivedWithDuration<T>(
    rec: TReceived<T>
  ): TReceivedWithDuration<T> {
    // Record start time
    const startTime = performance.now();
    // Assign resive
    let received = await this.#getReceive(rec);

    // Record end time
    const endTime = performance.now();
    // Calc duration
    const duration = endTime - startTime;

    return { received, duration };
  }

  static #getReceive = async <T>(rec: TReceived<T>) =>
    this.#isTCallback(rec) ? await rec() : rec;

  // Type guard to check if rec is a TCallback<T>
  static #isTCallback<T>(rec: TReceived<T>): rec is TCallback<T> {
    return typeof rec === "function";
  }
}

