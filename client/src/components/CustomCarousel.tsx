import { useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import ForwardIcon from '@/assets/icons/forward.svg?react'
import BackwardIcon from '@/assets/icons/backward.svg?react'
import { useWindowDimensions } from '@/hooks'

const images = [
  'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
]

type CustomCarouselProps = {
  itemWidth?: number
  itemClassName?: string
  autoPlay?: boolean
  loop?: boolean
  dragFree?: boolean
}
export default function CustomCarousel({
  itemWidth,
  autoPlay = true,
  loop = true,
  dragFree = false,
  itemClassName,
}: CustomCarouselProps) {
  const plugins = useMemo(() => {
    return autoPlay ? [Autoplay({ stopOnInteraction: false })] : []
  }, [autoPlay])

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: loop, dragFree: dragFree },
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
        <div className="flex">
          {images.map((src, index) => (
            <div
              key={index}
              className="px-3"
              style={{ flex: `0 0 ${itemWidth || flexWidth}%` }} // Dynamic width
            >
              <img
                src={src}
                alt={`Slide ${index}`}
                className={classNames(
                  'w-full object-cover rounded-lg h-52 sm:h-56 md:h-60',
                  itemClassName
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {canScroll.prev && (
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2"
          onClick={scrollPrev}
        >
          <BackwardIcon className="size-12 bg-black/40 p-3 rounded-full hover:bg-black/50" />
        </button>
      )}
      {canScroll.next && (
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
