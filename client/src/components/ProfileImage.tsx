import classNames from 'classnames'
import { useMemo } from 'react'

const ProfileImage = ({
  imgUrl,
  imgFile,
  alt = 'icon',
  className,
}: {
  imgUrl?: string
  imgFile?: File
  alt?: string
  className?: string
}) => {
  const fileUrl = useMemo(() => {
    if (imgFile) {
      return URL.createObjectURL(imgFile)
    }
  }, [imgFile])

  return (
    <img
      className={classNames('size-8 rounded-full aspect-square', className)}
      src={
        fileUrl ||
        imgUrl ||
        'https://i.pinimg.com/550x/93/d3/e3/93d3e31639a4d07613de9dccdc8bd5e8.jpg'
      }
      alt={alt}
    />
  )
}

export default ProfileImage
