import { DropdownOption } from '@/components/Dropdown'

declare global {
  interface Array<T> {
    removeDuplicateObjects(key: keyof T): Array<T>
    toDropdownOptions(labelKey?: keyof T, valueKey?: keyof T): DropdownOption[]
    // toDropdownOptions(): DropdownOption[]
    /**
     *  List of values to Dropdown Options
     */
    flatDropdownOptions(field: 'label' | 'value'): string[]
    findDropdownOption(value: string): DropdownOption | null
  }
}

Array.prototype.removeDuplicateObjects = function (key) {
  return this.filter((value, index, self) => {
    return index === self.findIndex((t) => t[key] === value[key])
  })
}

Array.prototype.toDropdownOptions = function (labelKey, valueKey) {
  if (labelKey && valueKey) {
    return this.map((e) => ({ label: e[labelKey], value: e[valueKey] }))
  }
  return this.map((e) => ({ label: e, value: e }))
}

Array.prototype.toDropdownOptions = function () {
  return this.map((e) => ({ label: e, value: e }))
}

Array.prototype.findDropdownOption = function (value) {
  return this.find((option: DropdownOption) => option.value == value)
}

Array.prototype.flatDropdownOptions = function (field) {
  return this?.map((option) => option[field])
}

export function findAddedAndRemovedOptions(
  prevOptions?: DropdownOption[],
  newOptions?: DropdownOption[]
) {
  const prevSet = new Set(prevOptions?.map((option) => option.value))
  const nextSet = new Set(newOptions?.map((option) => option.value))

  const addedValues = Array.from(nextSet).filter((value) => !prevSet.has(value))
  const removedValues = Array.from(prevSet).filter(
    (value) => !nextSet.has(value)
  )

  const added = newOptions?.filter((option) =>
    addedValues.includes(option.value)
  )
  const removed = prevOptions?.filter((option) =>
    removedValues.includes(option.value)
  )

  return { added, removed }
}
export default {}
