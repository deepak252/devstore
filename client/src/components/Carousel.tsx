import classNames from 'classnames'
import Shimmer from './Shimmer'

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
        'py-3 px-2 grid grid-flow-col overflow-x-auto scrollbar-thin',
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
      {items.map(({ url, redirect }) => (
        <CarouselItem key={redirect} imgUrl={url} />
      ))}
    </CarouselWrapper>
  )
}

export const CarouselShimmer = ({
  count = 6,
  className,
}: {
  count: number
  className?: string
}) => {
  return (
    <CarouselWrapper>
      {[...Array(count).keys()].map((id) => (
        <Shimmer
          key={id}
          className={classNames(
            '!w-96 max-w-[70vw] min-w-60 m-3 aspect-video !rounded-2xl overflow-hidden max-md:!w-80',
            className
          )}
        />
      ))}
    </CarouselWrapper>
  )
}

export default Carousel
