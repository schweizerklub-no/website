/**
 * Drop object properties whose value is `undefined`. The result is typed so
 * every key is optional, which lets you spread it into an object with optional
 * fields while keeping `exactOptionalPropertyTypes` satisfied.
 *
 * ```ts
 * const meta = { ...defined({ description: maybe }) };
 * ```
 */
export const defined = <T extends object>(
  input: T,
): { [K in keyof T]?: Exclude<T[K], undefined> } =>
  Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  ) as { [K in keyof T]?: Exclude<T[K], undefined> };
