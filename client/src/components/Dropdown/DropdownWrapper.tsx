import { useEffect, useRef } from 'react'
import classNames from 'classnames'

type DropdownWrapperProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  target: React.ReactNode
  children: React.ReactNode
  className?: string
  contentClass?: string
}

const DropdownWrapper = ({
  isOpen,
  setIsOpen,
  target,
  children,
  className,
  contentClass,
}: DropdownWrapperProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen && setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [setIsOpen])

  return (
    <div ref={dropdownRef} className={classNames('relative', className)}>
      {
        <div
          role="button"
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen && setIsOpen(!isOpen)
          }}
        >
          {target}
        </div>
      }
      {isOpen && (
        <div className={classNames('dropdown', contentClass)}>{children}</div>
      )}
    </div>
  )
}

export default DropdownWrapper
