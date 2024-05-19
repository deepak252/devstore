type DropdownTargetProps = {
  children: React.ReactNode
  label?: string
  placeholder?: string
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined
  className?: string
}

const DropdownTarget = ({
  children,
  placeholder,
  label,
  onClick,
  className,
}: DropdownTargetProps) => {
  return (
    <div role="button" onClick={onClick}>
      {children || (
        <div
          className={`font-13 d-flex align-items-center justify-content-between px-1 border-0 rounded-2 bg-secondary disable-select  ${className}`}
        >
          {label ? (
            <span
              className="w-100 text-center font-medium-13 overflow-ellipsis"
              style={{ margin: '8px 0' }}
            >
              {label}
            </span>
          ) : (
            <span
              className="w-100 text-center text-light overflow-ellipsis"
              style={{ margin: '8px 0' }}
            >
              {placeholder}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default DropdownTarget
