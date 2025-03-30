import React, { useRef, useState } from 'react'
import classNames from 'classnames'
import UploadIcon from '@/assets/icons/file-upload.svg?react'

type FileInputProps = {
  hintText?: string
  hintDescription?: string
  hintIcon?: React.ReactNode
  onSelectFiles: (files: File[]) => void
  enableDragAndDrop?: boolean
  onDragEnter?: () => void
  onDragLeave?: () => void
  onError?: (error: Error) => void
  /**eg. ['.png', '.mp4'] */
  allowedFileTypes?: string[]
  maxFileSizeKB?: number
  children?: React.ReactNode
  multiple?: boolean
  disabled?: boolean
  className?: string
  targetClassName?: string
}

function FileInput({
  hintText = 'Drag & drop files here or click to select files',
  hintDescription,
  hintIcon,
  onSelectFiles,
  enableDragAndDrop = true,
  onDragEnter,
  onDragLeave,
  onError,
  allowedFileTypes = [],
  maxFileSizeKB,
  children,
  multiple,
  disabled,
  className,
  targetClassName,
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleTargetClick = () => {
    if (disabled) {
      return
    }
    fileInputRef?.current?.click()
  }

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return
    }
    handleSelectedFiles(e.target.files)
    clearFileInput()
  }

  const handleDragAndDrop = (
    e: React.DragEvent<HTMLDivElement>,
    callback: () => void
  ) => {
    if (!enableDragAndDrop || disabled) {
      return
    }
    e.preventDefault()
    callback && callback()
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragAndDrop(e, () => {
      onDragEnter && onDragEnter()
    })
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragAndDrop(e, () => {
      setDragging(true)
    })
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragAndDrop(e, () => {
      setDragging(false)
      onDragLeave && onDragLeave()
    })
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragAndDrop(e, () => {
      setDragging(false)
      handleSelectedFiles(e.dataTransfer.files)
    })
  }

  const handleSelectedFiles = (files: FileList | null) => {
    if (!files) return
    let selectedFiles = Array.from(files)
    if (allowedFileTypes && allowedFileTypes.length) {
      let isInvalidFileType = false
      selectedFiles = selectedFiles.filter((file) => {
        const ext = `.${file.getFileExtension()}`
        if (!allowedFileTypes.includes(ext)) {
          isInvalidFileType = true
        }
        return allowedFileTypes.includes(ext)
      })
      isInvalidFileType && onError && onError(new Error('Invalid file type'))
    }
    if (maxFileSizeKB && !isNaN(maxFileSizeKB)) {
      let isMaxSizeFile = false
      selectedFiles = selectedFiles.filter((file) => {
        if (file.size > 1024 * maxFileSizeKB) {
          isMaxSizeFile = true
        }
        return file.size <= 1024 * maxFileSizeKB
      })
      isMaxSizeFile &&
        onError &&
        onError(new Error('File size exceeds the limit'))
    }
    if (!multiple && selectedFiles.length > 1) {
      selectedFiles = selectedFiles.slice(0, 1)
    }
    onSelectFiles && selectedFiles?.length && onSelectFiles(selectedFiles)
  }

  return (
    <>
      <div
        className={classNames('cursor-pointer disable-select', className, {
          'opacity-50 cursor-not-allowed': disabled,
        })}
        onDragEnter={enableDragAndDrop ? handleDragEnter : undefined}
        onDragOver={enableDragAndDrop ? handleDragOver : undefined}
        onDragLeave={enableDragAndDrop ? handleDragLeave : undefined}
        onDrop={enableDragAndDrop ? handleDrop : undefined}
      >
        <input
          className="hidden"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple={multiple}
          accept={allowedFileTypes?.join(',')}
        />
        <div onClick={handleTargetClick} className="size-full">
          {children || (
            <div
              className={classNames(
                'flex-center flex-col size-full p-5 border border-dashed border-neutral-300 rounded-xl hover:border-primary',
                targetClassName,
                {
                  'bg-gray-200': dragging,
                }
              )}
            >
              {hintIcon || <UploadIcon className="size-10" />}
              <p className="text-sm text-gray-600 my-2">{hintText}</p>
              <p className="text-xs text-gray-500">{hintDescription}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default FileInput
