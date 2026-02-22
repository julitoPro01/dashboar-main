export function deleteProperties<T extends object, K extends readonly (keyof T)[]>(
  obj: T,
  keys: K
): Omit<T, K[number]> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key]) => !keys.includes(key as K[number])
    )
  ) as any;
}