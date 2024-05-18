import { useEffect, useState } from 'react'
import classNames from 'classnames'

export type ToastType = 'success' | 'error' | 'default'
export type ToastData = {
  type: ToastType | null
  message: string | null
}

type ToastProps = {
  title?: string
  message?: string
  type?: ToastType
  onClose?: () => void
  durationMS?: number
}

const Toast = ({ title, message, type, onClose, durationMS }: ToastProps) => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseToast()
    }, durationMS)
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMS])

  const handleCloseToast = () => {
    setIsOpen(false)
    onClose && onClose()
  }

  const containerClassNames = classNames(
    'flex flex-col items-start text-start fixed right-[43px] bottom-[48px] px-[19px] py-[14px] rounded-2xl w-[340px] min-h-[158px] max-h-[300px]',
    {
      'bg-red-200 text-red': type === 'error',
      'bg-green-200 text-green': type === 'success',
      'bg-primary-200': type === 'default',
    }
  )

  return (
    <>
      {isOpen && (
        <div className={containerClassNames}>
          <div className="flex justify-end w-full">
            <span
              className={classNames('text-13 underline cursor-pointer', {
                'text-green': type !== 'error',
              })}
              onClick={handleCloseToast}
            >
              Close
            </span>
          </div>
          <div className="overflow-y-auto">
            <p className="text-17 font-medium">{title}</p>
            <p
              className={classNames('text-15 mt-[13px]', {
                'text-gray-900': type === 'default',
              })}
            >
              {message}
            </p>
          </div>{' '}
        </div>
      )}
    </>
  )
}

Toast.defaultProps = {
  type: 'info',
  durationMS: 3000,
}

export default Toast
