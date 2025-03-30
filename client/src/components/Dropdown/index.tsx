import { useState } from 'react'
import DropdownWrapper from './DropdownWrapper'
import DropdownItem from './DropdownItem'
import CloseIcon from '@/assets/icons/close.svg?react'

export type DropdownOption<L = string, V = string> = {
  label: L
  value: V
  icon?: React.ReactNode
} & Record<string, any>

type DropdownProps<L = string, V = string> = {
  options: DropdownOption<L, V>[]
  selectedOptions?: DropdownOption<L, V>[]
  onChange?: (options: DropdownOption<L, V>[]) => void
  placeholder?: string
  // showSearch?: boolean
  showMenuIcon?: boolean
  multiselect?: boolean
  disabled?: boolean
  selectionLimit?: number
  wrapperClass?: string
  contentClass?: string
  itemClass?: string
  targetClass?: string
  children?: React.ReactNode
}

const Dropdown = ({
  options,
  selectedOptions,
  onChange,
  placeholder,
  // showSearch,
  showMenuIcon = false,
  multiselect,
  disabled,
  selectionLimit,
  wrapperClass,
  contentClass,
  itemClass,
  targetClass,
  children,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const disableSelect = (selectedOptions ?? []).length === selectionLimit

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
      if (multiselect) {
        updatedSelection = [...updatedSelection, option]
      } else {
        updatedSelection = [option]
      }
    }
    onChange && onChange(updatedSelection)
    if (!multiselect) {
      setIsOpen(false)
    }
  }

  return (
    <DropdownWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      placeholder={placeholder}
      label={selectedOptions?.[0]?.label}
      showMenuIcon={showMenuIcon}
      target={
        children ||
        (multiselect && selectedOptions?.length && (
          <div className="flex flex-wrap flex-grow py-1">
            {selectedOptions?.map((option) => (
              <DropdownChip
                key={option.value}
                label={option.label}
                onClose={() => handleItemClick(option)}
              />
            ))}
          </div>
        ))
      }
      className={wrapperClass}
      contentClass={contentClass}
      targetClass={targetClass}
    >
      {options?.length ? (
        options?.map((option) => (
          <DropdownItem
            key={option.value}
            label={option.label}
            icon={option.icon}
            isSelected={isSelected(option)}
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              handleItemClick(option)
            }}
            className={itemClass}
            isDisabled={disableSelect || disabled}
          />
        ))
      ) : (
        <DropdownItem
          label="No Options"
          isSelected={false}
          onClick={() => {}}
          className={itemClass}
          isDisabled
        />
      )}
    </DropdownWrapper>
  )
}

const DropdownChip = ({
  label,
  onClose,
}: {
  label: string
  onClose: () => void
}) => {
  return (
    <div className="chip ps-3 pe-2 py-1 active me-1 my-[3px]">
      <span className="text-13">{label}</span>
      <div>
        <CloseIcon
          className="size-4 ms-1"
          onClick={(e) => {
            e.stopPropagation()
            onClose && onClose()
          }}
        />
      </div>
    </div>
  )
}
export { DropdownWrapper, DropdownItem }
export default Dropdown
