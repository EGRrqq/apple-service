type TIsProp = <T>(prop: T | undefined, propName: string) => asserts prop is T;

// Ensure a specific property is assigned
export const isProp: TIsProp = (prop, propName) => {
  if (prop === undefined)
    throw Error(`Property '${propName}' is not assigned to the entity`);
};

