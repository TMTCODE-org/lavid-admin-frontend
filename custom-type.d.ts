type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null;
};

type Nullable<T> = { [K in keyof T]: T[K] | null };

type ExtractIds<T> = {
  [K in keyof T as `${string & K}Id`]: T[K] extends { id: infer U } ? U : never;
};
