// Generic utility function to exclude keys from an object
export function exclude<
  T extends Record<string, any>,
  K extends keyof T
>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>;
}
