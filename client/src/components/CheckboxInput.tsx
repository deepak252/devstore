import { useEffect, useState } from 'react'
import classNames from 'classnames'

type CheckboxInputProps = {
  title?: string
  checked?: boolean
  disabled?: boolean
  onChange?: (val: boolean) => void
  className?: string
}
const CheckboxInput = ({
  checked,
  title,
  disabled,
  onChange,
  className,
}: CheckboxInputProps) => {
  const [isChecked, setIsChecked] = useState(false)
  useEffect(() => {
    setIsChecked(checked ?? false)
  }, [checked])

  const handleToggleCheck = () => {
    if (disabled) {
      return
    }
    setIsChecked(!isChecked)
    onChange && onChange(!isChecked)
  }

  return (
    <div
      className={classNames(
        'inline-flex items-center disable-select cursor-pointer',
        className,
        {
          'cursor-pointer': !disabled,
        }
      )}
      onClick={handleToggleCheck}
    >
      <input
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        readOnly={true}
        className={classNames({
          'cursor-pointer': !disabled,
        })}
      />
      {title && <p className="ms-2 text-gray-800 text-sm">{title}</p>}
    </div>
  )
}

export default CheckboxInput
