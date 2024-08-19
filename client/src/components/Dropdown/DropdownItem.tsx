import classNames from 'classnames'
import CheckIcon from '@/assets/icons/check.svg?react'

type DropdownItemProps = {
  label: string
  icon?: React.ReactNode
  isSelected: boolean
  isDisabled?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
  className?: string
}
const DropdownItem = ({
  label,
  icon,
  isSelected,
  isDisabled,
  onClick,
  className,
}: DropdownItemProps) => {
  const disabled = !isSelected && isDisabled
  return (
    <div
      className={classNames('dropdown-item', className, {
        selected: isSelected,
        disabled,
      })}
      onClick={disabled ? undefined : onClick}
      role="button"
    >
      {icon}
      <span className="flex-grow overflow-ellipsis">{label}</span>
      {isSelected && <CheckIcon className="size-5 fill-primary ms-2" />}
    </div>
  )
}

export default DropdownItem
