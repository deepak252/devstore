import classNames from 'classnames'

type DropdownItemProps = {
  label: string
  isSelected: boolean
  onClick: () => void
  className?: string
}
const DropdownItem = ({
  label,
  isSelected,
  onClick,
  className,
}: DropdownItemProps) => {
  return (
    <div
      className={classNames('dropdown-item', className, {
        'bg-primary-200 text-primary': isSelected,
      })}
      onClick={onClick}
      role="button"
    >
      <span className="flex-grow overflow-ellipsis ">{label}</span>
    </div>
  )
}

export default DropdownItem
