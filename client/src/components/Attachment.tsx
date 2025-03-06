import { useMemo } from 'react'
import classNames from 'classnames'
import CloseIcon from '@/assets/icons/close.svg?react'

type AttachmentProps = {
  file?: File | null
  url?: string | null
  onRemove?: () => void
  className?: string
  wrapperClassName?: string
}
const Attachment = ({
  file,
  url,
  onRemove,
  className,
  wrapperClassName,
}: AttachmentProps) => {
  const src = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file)
    }
    return url || ''
  }, [file, url])

  return (
    <div
      className={classNames(
        'card relative size-full overflow-hidden',
        wrapperClassName
      )}
    >
      {(file || url) && onRemove && (
        <button
          className="icon-button absolute right-1 top-1 z-[1]"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onRemove()
          }}
        >
          <CloseIcon className="fill-white bg-gray-800 rounded-full p-1" />
        </button>
      )}
      <img
        src={src}
        alt="attch_image"
        className={classNames('size-full object-cover', className)}
      />
    </div>
  )
}

export default Attachment
