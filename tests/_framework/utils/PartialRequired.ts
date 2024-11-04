// Create a utility type that makes all properties required but allows them to be undefined
export type PartialRequired<T> = {
  [P in keyof T]: T[P] | undefined;
};

