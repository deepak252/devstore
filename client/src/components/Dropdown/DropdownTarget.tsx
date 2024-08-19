import classNames from 'classnames'
import ArrowDropdownIcon from '@/assets/icons/chevron-down.svg?react'

type DropdownTargetProps = {
  children: React.ReactNode
  label?: string
  placeholder?: string
  showMenuIcon?: boolean
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined
  className?: string
}

const DropdownTarget = ({
  children,
  placeholder,
  showMenuIcon,
  label,
  onClick,
  className,
}: DropdownTargetProps) => {
  return (
    <div
      role="button"
      className={classNames('flex items-center', className)}
      onClick={onClick}
    >
      <div className="flex-grow overflow-hidden">
        {children || (
          <div
            className={classNames(
              'overflow-ellipsis py-3 text-sm font-medium text-gray-800',
              {
                'font-normal !text-gray-600': !label,
              }
            )}
          >
            {label || placeholder}
          </div>
        )}
      </div>
      {showMenuIcon && (
        <div>
          <ArrowDropdownIcon className="ms-2 size-5 fill-primary" />
        </div>
      )}
    </div>
  )
}

export default DropdownTarget
