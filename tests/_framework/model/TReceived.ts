// define async or not async callback
export type TCallback<T> = () => Promise<T> | T;
export type TReceived<T> = TCallback<T> | T;
export type TReceivedWithDuration<T> = Promise<{
  received: T;
  duration: number;
}>;

