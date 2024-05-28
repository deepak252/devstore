import classNames from 'classnames'

type CarouselItemProps = {
  imgUrl: string
  onClick?: () => void
  className?: string
}

export const CarouselItem = ({
  imgUrl,
  onClick,
  className,
}: CarouselItemProps) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        'w-96 max-w-[70vw] min-w-60 m-3 shadow-sm aspect-video rounded-2xl overflow-hidden max-md:w-80',
        className
      )}
    >
      <img src={imgUrl} alt="carousel_item" />
    </div>
  )
}

type CarouselWrapperProps = {
  className?: string
  children: React.ReactNode
}

export const CarouselWrapper = ({
  className,
  children,
}: CarouselWrapperProps) => {
  return (
    <div
      className={classNames(
        'py-3 px-2 grid grid-flow-col overflow-x-auto',
        className
      )}
    >
      {children}
    </div>
  )
}

type CarouselProps = {
  items: { url: string; redirect?: string }[]
  className?: string
}

const Carousel = ({ className, items }: CarouselProps) => {
  return (
    <CarouselWrapper className={className}>
      {items.map(({ url }) => (
        <CarouselItem key={url} imgUrl={url} />
      ))}
    </CarouselWrapper>
  )
}

export default Carousel
