export const getChangedFields = <T extends Record<string, any>>(
  currentValues: T,
  updatedValues: Partial<T>
): Partial<T> => {
  return Object.keys(updatedValues).reduce((changes, key) => {
    const typedKey = key as keyof T
    if ((updatedValues[typedKey] ?? '') !== (currentValues[typedKey] ?? '')) {
      changes[typedKey] = updatedValues[typedKey]
    }
    return changes
  }, {} as Partial<T>)
}
