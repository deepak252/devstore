import { useState } from 'react'
import DropdownWrapper from './DropdownWrapper'
import DropdownItem from './DropdownItem'

export type DropdownOption = {
  label: string
  value: string
} & Record<string, any>

type DropdownProps = {
  options: DropdownOption[]
  selectedOptions?: DropdownOption[]
  onChange?: (options: DropdownOption[]) => void
  // showSearch?: boolean
  isMultiSelect?: boolean
  wrapperClass?: string
  contentClass?: string
  itemClass?: string
  children?: React.ReactNode
}

const Dropdown = ({
  options,
  selectedOptions,
  onChange,
  // showSearch,
  isMultiSelect,
  wrapperClass,
  contentClass,
  itemClass,
  children,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const isSelected = (option: DropdownOption) => {
    return (
      (selectedOptions ?? []).findIndex((o) => o.value === option.value) !== -1
    )
  }

  const handleItemClick = (option: DropdownOption) => {
    let updatedSelection = selectedOptions || []
    if (isSelected(option)) {
      updatedSelection = updatedSelection.filter(
        (o) => o.value !== option.value
      )
    } else {
      updatedSelection = [...updatedSelection, option]
    }
    onChange && onChange(updatedSelection)
    if (!isMultiSelect) {
      setIsOpen(false)
    }
  }

  return (
    <DropdownWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      target={children}
      className={wrapperClass}
      contentClass={contentClass}
    >
      {options?.map((option) => (
        <DropdownItem
          key={option.value}
          label={option.label}
          isSelected={isSelected(option)}
          onClick={() => handleItemClick(option)}
          className={itemClass}
        />
      ))}
    </DropdownWrapper>
  )
}

export default Dropdown
