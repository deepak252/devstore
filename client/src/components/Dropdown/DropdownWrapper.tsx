import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import DropdownTarget from './DropdownTarget'

type DropdownWrapperProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  target: React.ReactNode
  children: React.ReactNode
  showMenuIcon?: boolean
  placeholder?: string
  label?: string
  className?: string
  contentClass?: string
  targetClass?: string
}

const DropdownWrapper = ({
  isOpen,
  setIsOpen,
  target,
  placeholder,
  showMenuIcon,
  label,
  children,
  className,
  contentClass,
  targetClass,
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
    <div ref={dropdownRef} className={classNames('relative w-full', className)}>
      {
        <DropdownTarget
          placeholder={placeholder || 'Select'}
          label={label}
          showMenuIcon={showMenuIcon}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen && setIsOpen(!isOpen)
          }}
          className={targetClass}
        >
          {target}
        </DropdownTarget>
      }
      {isOpen && (
        <div className={classNames('dropdown', contentClass)}>{children}</div>
      )}
    </div>
  )
}

export default DropdownWrapper
