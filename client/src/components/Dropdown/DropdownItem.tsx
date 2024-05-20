import classNames from 'classnames'
import CheckIcon from '@/assets/icons/Check.svg?react'

type DropdownItemProps = {
  label: string
  icon?: React.ReactNode
  isSelected: boolean
  onClick: () => void
  className?: string
}
const DropdownItem = ({
  label,
  icon,
  isSelected,
  onClick,
  className,
}: DropdownItemProps) => {
  return (
    <div
      className={classNames('dropdown-item', className, {
        selected: isSelected,
      })}
      onClick={onClick}
      role="button"
    >
      {icon}
      <span className="flex-grow overflow-ellipsis ">{label}</span>
      {isSelected && <CheckIcon className="size-5 fill-primary ms-2" />}
    </div>
  )
}

export default DropdownItem
