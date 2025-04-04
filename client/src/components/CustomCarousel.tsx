import { useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import ForwardIcon from '@/assets/icons/forward.svg?react'
import BackwardIcon from '@/assets/icons/backward.svg?react'
import { useWindowDimensions } from '@/hooks'
import Shimmer from './Shimmer'

type CarouselItem = {
  id: string
  imgUrl: string
  redirectUrl?: string
}

type CustomCarouselProps = {
  items: CarouselItem[]
  itemWidth?: number
  autoPlay?: boolean
  loop?: boolean
  dragFree?: boolean
  isLoading?: boolean
  itemClassName?: string
  onItemClick?: (item: CarouselItem) => void
}
export default function CustomCarousel({
  items = [],
  itemWidth,
  autoPlay = true,
  loop = true,
  dragFree = false,
  isLoading,
  itemClassName,
  onItemClick,
}: CustomCarouselProps) {
  const plugins = useMemo(() => {
    return autoPlay ? [Autoplay({ stopOnInteraction: false })] : []
  }, [autoPlay])

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: loop, dragFree: dragFree, align: 'center' },
    plugins
  )

  const { width } = useWindowDimensions()

  const flexWidth = useMemo(() => {
    if (width < 640) return 90
    if (width < 768) return 80
    if (width < 1024) return 60
    return 50
  }, [width])

  const [canScroll, setCanScroll] = useState({
    next: true,
    prev: true,
  })

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const checkScroll = () => {
      const prev = emblaApi.canScrollPrev()
      const next = emblaApi.canScrollNext()
      setCanScroll((curr) => {
        if (curr.prev == prev && curr.next == next) {
          return curr
        }
        return {
          prev,
          next,
        }
      })
    }

    emblaApi.on('select', checkScroll) // Update state on selection change
    checkScroll() // Initial check

    return () => {
      emblaApi.off('select', checkScroll)
    }
  }, [emblaApi])

  return (
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex mx-auto">
          {isLoading
            ? [...Array(3).keys()].map((id) => (
                <div
                  key={id}
                  className="px-3"
                  style={{ flex: `0 0 ${itemWidth || flexWidth}%` }} // Dynamic width
                >
                  <Shimmer
                    key={id}
                    className={classNames(
                      'w-full object-cover rounded-lg h-52 sm:h-56 md:h-60',
                      itemClassName
                    )}
                  />
                </div>
              ))
            : items.map((item) => (
                <div
                  key={item.id}
                  className="px-3"
                  style={{ flex: `0 0 ${itemWidth || flexWidth}%` }} // Dynamic width
                >
                  <div
                    className={classNames(
                      'bg-neutral-200 relative overflow-hidden rounded-lg h-52 sm:h-56 md:h-60',
                      itemClassName
                    )}
                  >
                    <img
                      src={item.imgUrl}
                      className="absolute-center"
                      onClick={() => {
                        onItemClick?.(item)
                      }}
                    />
                  </div>
                </div>

                // <div
                //   key={id}
                //   className="px-3"
                //   style={{ flex: `0 0 ${itemWidth || flexWidth}%` }} // Dynamic width
                // >
                //   <img
                //     src={imgUrl}
                //     alt={`Devstore Banner ${id}`}
                //     className={classNames(
                //       'w-full object-cover rounded-lg h-52 sm:h-56 md:h-60',
                //       itemClassName
                //     )}
                //     onClick={() => {
                //       onItemClick?.(id, redirectUrl)
                //     }}
                //   />
                // </div>
              ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {canScroll.prev && items.length > 1 && (
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2"
          onClick={scrollPrev}
        >
          <BackwardIcon className="size-12 bg-black/40 p-3 rounded-full hover:bg-black/50" />
        </button>
      )}
      {canScroll.next && items.length > 1 && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={scrollNext}
        >
          <ForwardIcon className="size-12 bg-black/40 p-3 rounded-full hover:bg-black/50" />
        </button>
      )}
    </div>
  )
}
