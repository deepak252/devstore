import { FILE_EXTENSIONS, REGEX } from '@/constants'

declare global {
  interface File {
    getFileType(): 'image' | 'video' | undefined
    getFileExtension(): string | undefined
  }
}

File.prototype.getFileType = function () {
  const ext = `.${this.getFileExtension()}`
  if (FILE_EXTENSIONS.VIDEO.includes(ext)) {
    return 'video'
  } else if (FILE_EXTENSIONS.IMAGE.includes(ext)) {
    return 'image'
  }
}

File.prototype.getFileExtension = function () {
  return this.name.split('.').pop()
}

export const getFileExtensionFromName = (fileName: string) =>
  fileName.split('.').pop()

export const getFileSizeMb = (size: number) =>
  Math.round(size / (1024 * 10.24)) / 100

export const getFileSizeKb = (size: number) => Math.round(size / 1024)

/**
 * @param {*} file - file URL or Local File instance
 */
export const downloadFile = async (
  fileUrl: string,
  fileName: string,
  onError: (e: any) => void
) => {
  try {
    if (!REGEX.URL.test(fileUrl)) {
      throw new Error('Invalid file url')
    }
    // file is URL
    const response = await fetch(fileUrl)
    if (!response.ok) {
      throw response
    }
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

    // Create a temporary anchor element
    const a = document.createElement('a')
    a.href = url
    a.download = fileName || 'download'
    // a.target='_blank';

    document.body.appendChild(a)
    a.click()
    // Remove the anchor from the document
    document.body.removeChild(a)

    URL.revokeObjectURL(url)
  } catch (e) {
    console.error(e)
    onError && onError(e)
  }
}
