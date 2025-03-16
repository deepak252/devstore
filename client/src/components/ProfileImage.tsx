import classNames from 'classnames'

const ProfileImage = ({
  imgUrl,
  alt = 'icon',
  className,
}: {
  imgUrl?: string
  alt?: string
  className?: string
}) => {
  return (
    <img
      className={classNames('size-8 rounded-full aspect-square', className)}
      src={
        imgUrl ||
        'https://i.pinimg.com/550x/93/d3/e3/93d3e31639a4d07613de9dccdc8bd5e8.jpg'
      }
      alt={alt}
    />
  )
}

export default ProfileImage
